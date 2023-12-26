const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const uuid = require('uuid');
const db = require('./db');

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.use(cors({
    origin: ["http://127.0.0.1:5500"],
    credentials: true
}));

// Set up body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Serve HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/', upload.single('image'), (req, res) => {
    // Access form data using req.body
    const formData = req.body;

    // Access uploaded file information using req.file
    const imagePath = req.file ? req.file.path : null;

    console.log('Received form submission:');
    console.log('Form Data:', formData);
    console.log('Image Path:', imagePath);

    // Use the connection pool from db.js
    db.query('INSERT INTO properties (name, address, unit, city, state, room_type, price, description, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            formData.name,
            formData.address,
            formData.unitNumber,
            formData.selectedCity,
            formData.selectedState,
            formData.selectedRoom,
            formData.price,
            formData.description,
            imagePath,
        ],
        (error, results) => {
            if (error) {
                console.error('Error inserting data into MySQL:', error);
                res.json({ success: false, message: 'Error submitting form' });
            } else {
                console.log('Data inserted into MySQL:', results);
                res.json({ success: true, message: 'Form submitted successfully!' });
            }
        });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

