const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');
// require('dotenv').config()
const cors = require('cors');
const uuid = require('uuid');
const db = require('./db');


const app = express();
const port = 3000;

app.use(morgan('dev'))


app.use(cors({
    origin: ["http://127.0.0.1:5500"],
    credentials: true
}))

// Set up MySQL connection

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

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
app.post('https://rental-server-m0k6.onrender.com', upload.single('image'), (req, res) => {
    // Access form data using req.body
    const formData = req.body;

    // Access uploaded file information using req.file
    const imagePath = req.file ? req.file.path : null;

    console.log('Received form submission:');
    console.log('Form Data:', formData);
    console.log('Image Path:', imagePath);

    // Insert data into MySQL database
    const sql = 'INSERT INTO properties (name, address, unit, city, state, room_type, price, description, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
        formData.name,
        formData.address,
        formData.unit,
        formData.selectedCity,
        formData.selectedState,
        formData.selectedRoom,
        formData.price,
        formData.description,
        imagePath,
    ];

    connection.query(sql, values, (error, results) => {
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
