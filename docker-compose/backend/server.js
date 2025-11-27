const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
app.use(cors()); app.use(express.json());

// Connect to DB using Env Vars
console.log("Connecting to DB at", process.env.DB_HOST || 'localhost');
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'chat',
  password: process.env.DB_PASS || 'password',
  port: 5432,
};

const pool = new Pool(dbConfig);

const connectWithRetry = () => {
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.log('Database not ready... retrying in 2 seconds');
      setTimeout(connectWithRetry, 2000); // Wait 2s and try again
    } else {
      console.log('Database connected successfully!');
      setupTable(); // Only create table once connected
    }
  });
};

function setupTable() {
    pool.query('CREATE TABLE IF NOT EXISTS messages (user_name TEXT, content TEXT)', (err, res) => {
        if (err) console.error("DB Error:", err); else console.log("Table Ready");
    });
}

// Start the retry loop
connectWithRetry();

app.get('/messages', async (req, res) => {
  const result = await pool.query('SELECT * FROM messages');
  res.json(result.rows);
});

app.post('/messages', async (req, res) => {
  await pool.query('INSERT INTO messages (user_name, content) VALUES ($1, $2)', [req.body.user, req.body.content]);
  res.send('Sent');
});

app.listen(3000, () => console.log('Backend listening on port 3000'));