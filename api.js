const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // for cross-operating resource sharing
app.use(express.json()); // for parsing application/json

const sql = require('mssql/msnodesqlv8');

const config = {
    server: 'localhost',
    database: 'Project_Connect',
    options: {
        trustedConnection: true,
        trustServerCertificate: true // Only for development, remove for production
    }
};

// Initialize SQL connection pool
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on('error', err => {
    console.error('SQL Pool Error:', err);
});

// GET endpoint to retrieve the last 5 records
app.get('/api-js', async (req, res) => {
    try {
        await poolConnect;
        const result = await pool.request().query('SELECT TOP 5 [API_Output] FROM API_Outputs ORDER BY EntryDate DESC');
        res.json({ data: result.recordset });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
});

// POST endpoint to add a new record
app.post('/api-js', async (req, res) => {
    try {
        // Ensure the pool is connected
        await poolConnect;

        // Insert a new record into the API_Outputs table
        const query = `INSERT INTO API_Outputs (API_Output) VALUES ('JavaScript is the best!')`;
        await pool.request().query(query);

        res.json({ message: 'Record added successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
});

// DELETE endpoint to delete all records
app.delete('/delete-api-js', async (req, res) => {
    try {
        await poolConnect;
        await pool.request().query('DELETE FROM API_Outputs');
        res.json({ message: 'All records deleted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while deleting records", error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});