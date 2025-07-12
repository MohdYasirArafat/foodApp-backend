// server.js

import express from 'express';
// import mysql from 'mysql2';
import cors from 'cors';
import db from "./db.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Use middlewares
app.use(cors());
app.use(bodyParser.json());

// Use dynamic port for deployment or 5000 locally
const PORT = process.env.PORT || 5000;

// // MySQL Connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// db.connect((err) => {
//   if (err) {
//     console.error(' MySQL connection failed:', err);
//   } else {
//     console.log(' Connected to MySQL database!');
//   }
// });

// Routes

// Home Route
app.get('/', (req, res) => {
  res.send(' Food API is running...');
});

// Get all foods
app.get('/foods', (req, res) => {
  db.query('SELECT * FROM foods', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add new food
app.post('/foods', (req, res) => {
  const { name, price, img, desc, category, rating } = req.body;
  const sql = 'INSERT INTO foods (name, price, img, `desc`, category, rating) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, price, img, desc, category, rating], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

// Update food
app.put('/foods/:id', (req, res) => {
  const { name, price, img, desc, category, rating } = req.body;
  const sql = 'UPDATE foods SET name=?, price=?, img=?, `desc`=?, category=?, rating=? WHERE id=?';
  db.query(sql, [name, price, img, desc, category, rating, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: ' Food updated' });
  });
});

// Delete food
app.delete('/foods/:id', (req, res) => {
  db.query('DELETE FROM foods WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: ' Food deleted' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(` Server running at: http://localhost:${PORT}`);
});






// // server.js
// import express from 'express';
// import mysql from 'mysql2';
// import cors from 'cors';
// import bodyParser from 'body-parser';

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// import dotenv from 'dotenv';
// dotenv.config(); // this loads all values from .env into process.env


// const port = process.env.PORT || 5000;

// //  MySQL Connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

// db.connect((err) => {
//   if (err) {
//     console.error(' MySQL connection failed:', err);
//   } else {
//     console.log(' Connected to MySQL database!');
//   }
// });

// //  Home Route
// app.get('/', (req, res) => {
//   res.send(' Food API is running...');
// });

// //  GET all foods
// app.get('/foods', (req, res) => {
//   db.query('SELECT * FROM foods', (err, results) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json(results);
//   });
// });

// //  ADD new food
// app.post('/foods', (req, res) => {
//   const { name, price, img, desc, category, rating } = req.body;
//   const sql = 'INSERT INTO foods (name, price, img, `desc`, category, rating) VALUES (?, ?, ?, ?, ?, ?)';
//   db.query(sql, [name, price, img, desc, category, rating], (err, result) => {
//     if (err) return res.status(500).json({ error: err });
//     res.status(201).json({ id: result.insertId, ...req.body });
//   });
// });

// //  UPDATE food
// app.put('/foods/:id', (req, res) => {
//   const { name, price, img, desc, category, rating } = req.body;
//   const sql = 'UPDATE foods SET name=?, price=?, img=?, `desc`=?, category=?, rating=? WHERE id=?';
//   db.query(sql, [name, price, img, desc, category, rating, req.params.id], (err) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json({ message: ' Food updated' });
//   });
// });

// //  DELETE food
// app.delete('/foods/:id', (req, res) => {
//   db.query('DELETE FROM foods WHERE id=?', [req.params.id], (err) => {
//     if (err) return res.status(500).json({ error: err });
//     res.json({ message: ' Food deleted' });
//   });
// });

// //  Start server
// app.listen(PORT, () => {
//   console.log(` Server running at: http://localhost:${PORT}`);
// });
