const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: 'your_host',
  user: 'your_user',
  password: 'your_password',
  database: 'your_database'
});

// Sample array of arrays
const dataArray = [
  ['John', 30],
  ['Alice', 25],
  ['Bob', 35]
];

// Function to insert data into the database
async function insertData() {
  try {
    const connection = await pool.getConnection();
    for (const data of dataArray) {
      await connection.query('INSERT INTO your_table (name, age) VALUES (?, ?)', data);
    }
    connection.release();
    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

// Call the function to insert data
insertData();
