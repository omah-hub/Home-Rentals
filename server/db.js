const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

module.exports = pool.promise()



// require('dotenv').config();

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     // port: process.env.DB_PORT,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     ssl: {
//         // Enable SSL/TLS
//         rejectUnauthorized: false, // Set to true in production, false for testing
//       },
// }).promise(); // This makes the pool support promises

// // Attempt to connect to MySQL
// pool.getConnection()
//     .then((connection) => {
//         console.log('Connected to MySQL');
//         connection.release(); // Release the connection immediately after checking
//     })
//     .catch((err) => {
//         console.error('Error connecting to MySQL:', err);
//     });

// module.exports = pool;

// const { createPool } = require('mysql2');
// require('dotenv').config();

// const db = createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 10,
// });

// module.exports = db;
// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_DATABASE', process.env.DB_DATABASE);
// // ... other variables

