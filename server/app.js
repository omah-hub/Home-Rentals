const path = require('path')
const express = require('express')
const mysql = require('mysql2/promise');
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const uuid = require('uuid')
const bodyParser = require('body-parser')

const db = require('./db')

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


app.use(
  cors({
      origin: ["http://127.0.0.1:5500", "https://home-rental-25jp.onrender.com"],
      credentials: true,
  })
)



app.get("/properties", async (req, res) => {
  try {
      const sql = "SELECT * FROM property";
      const [data] = await db.execute(sql);
      
      let response = {
        data,
        statusCode: 200,
        message: 'property posted successfully',
      }

      res.status(200).json(response)
    } catch (error) {
      const response = {
        message: error.message,
        statusCode:400
      }
      res.status(400).json(response)
    }
})

app.post('/properties', async (req, res) => {

  const { username, address, unitNumber, selectedCity, selectedState, selectedRoom, price, description } = req.body
  const id = uuid.v4()

  try {
    if (!username) throw Error('Name is required')
    if (!address) throw Error('Address is required')
    if (!unitNumber) throw Error('Unit is required')
    if (!selectedCity) throw Error('City is required')
    if (!selectedState) throw Error('State is required')
    if (!selectedRoom) throw Error('Room is required')
    if (!price) throw Error('Price is required')
    if (!description) throw Error('Description is required')

    const sql = `INSERT INTO property (Name, Address, Unit_Number, City, State, Room_Type, Price, Description) VALUES ("${username}", "${address}", "${unitNumber}", "${selectedCity}", "${selectedState}", "${selectedRoom}", "${price}", "${description}");`
    await db.execute(sql)

    let response = {
      statusCode: 200,
      message: 'property added successfully',
    }

    res.status(200).json(response)
  } catch (error) {
    const response = {
      message: error.message,
      statusCode: 400
    }
    res.status(400).json(response)
  }
})
// app.post('/add-property', (req, res) => {
//     console.log('Content-Type:', req.get('Content-Type'));
//     console.log(req.body)
//     res.send('POST ')
// })
// app.post('/properties', async (req, res) => {
//     try {
//       console.log("Received POST request:", req.body);
//       const { username, address, unitNumber, selectedCity, selectedState, selectedRoom, price, description } = req.body;
  
  
  
//       const [result] = await dbpool.execute(`
//         INSERT INTO property
//         ( Name, Address, Unit_Number, City, State, Room_Type, Price, Description)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//         `,[
//         username || null,
//         address || null,
//         unitNumber || null,
//         selectedCity || null, 
//         selectedState || null,
//         selectedRoom || null,
//         price || null,
//         description || null
//         ]);
  
  
  
//       res.json({ success: true, result });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
//   });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})