// Load environment variables from a .env file.
require('dotenv').config();

// Import the Pool class from the 'pg' library.
const { Pool } = require('pg');

// Create a new connection pool instance.
// The connection details are pulled from environment variables for security.
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Export a function to check the connection.
// This is used in main.js to ensure the database is ready before showing the window.
async function testConnection() {
    try {
        // Use `pool.query()` to execute a simple query to test the connection.
        await pool.query('SELECT NOW()');
        console.log('Database connection successful!');
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.stack);
        throw error;
    }
}

// Export the pool and the testConnection function.
module.exports = {
    query: (text, params) => pool.query(text, params),
    testConnection
};

