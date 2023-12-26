const mysql = require('mysql2');
require('dotenv').config();
const pool = mysql.createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}).promise(); // This makes the pool support promises

module.exports = pool;
// });

// module.exports = pool.promise()