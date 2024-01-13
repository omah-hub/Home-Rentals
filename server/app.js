const path = require('path')
const express = require('express')
const mysql = require('mysql2/promise');
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const uuid = require('uuid')
const bodyParser = require('body-parser')

const dbpool = require('./db')

const app = express()

const PORT = 3000
//parse form data
app.use(express.urlencoded({ extended: false}))
//static
app.use(express.static(path.join(__dirname, '..', 'client')));

// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, '..', 'client', 'images')));
//parse form data
// app.use(express.urlencoded({ extended: false}))

// Your other middleware and route handling here...

// Route to serve the index.html file
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
// commented it because of app.use and its already in the client folder
// });


// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use(cors({
    origin: ["http://127.0.0.1:5500", "https://home-rental-25jp.onrender.com"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))

app.get("/properties", (req, res) => {
    const sql = "SELECT * FROM homerentals.property";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

// app.post('/add-property', (req, res) => {
//     console.log('Content-Type:', req.get('Content-Type'));
//     console.log(req.body)
//     res.send('POST ')
// })
app.post('/add-property', async (req, res) => {
    try {
      const { username, address, unitNumber, selectedCity, selectedState, selectedRoom, price, description } = req.body;
  
  
  
      const [result] = await dbpool.execute(`
        INSERT INTO homerentals.property
        ( Name, Address, Unit_Number, City, State, Room_Type, Price, Description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,[
        username || null,
        address || null,
        unitNumber || null,
        selectedCity || null, 
        selectedState || null,
        selectedRoom || null,
        price || null,
        description || null
        ]);
  
  
  
      res.json({ success: true, result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})