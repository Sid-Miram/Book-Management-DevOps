const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Middleware for API Key Authentication
// app.use((req, res, next) => {
//   const apiKey = req.headers['api-key'];
//   if (!apiKey || apiKey !== process.env.API_KEY) {
//     return res.status(403).json({ message: 'Unauthorized' });
//   }
//   next();
// });

// CRUD Operations

// Get all books
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM book');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get book by ID
app.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM book WHERE book_id = $1', [req.params.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new book
app.post('/', async (req, res) => {
  const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;
  try {
    await pool.query('INSERT INTO book (book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher) VALUES ($1, $2, $3, $4, $5)', [book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher]);
    res.json({ message: 'Book added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update book
app.put('/:id', async (req, res) => {
  const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;
  try {
    await pool.query('UPDATE book SET book_name=$1, book_cat_id=$2, book_collection_id=$3, book_launch_date=$4, book_publisher=$5 WHERE book_id=$6', [book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher, req.params.id]);
    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all members
app.get('/members', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM member');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get books not borrowed
app.get('/not-borrowed', async (req, res) => {
  try {
    const result = await pool.query(`SELECT b.book_name, b.book_publisher FROM book b LEFT JOIN issuance i ON b.book_id = i.book_id WHERE i.book_id IS NULL`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

// Get outstanding books
app.get('/outstanding', async (req, res) => {
  try {
    const result = await pool.query(`SELECT m.mem_name, b.book_name, i.issuance_date, i.target_return_date, b.book_publisher FROM issuance i JOIN member m ON i.issuance_member = m.mem_id JOIN book b ON i.book_id = b.book_id WHERE i.issuance_status <> 'Returned'`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get top 10 most borrowed books
app.get('/top-borrowed', async (req, res) => {
  try {
    const result = await pool.query(`SELECT b.book_name, COUNT(i.book_id) AS times_borrowed, COUNT(DISTINCT i.issuance_member) AS unique_members FROM issuance i JOIN book b ON i.book_id = b.book_id GROUP BY b.book_name ORDER BY times_borrowed DESC LIMIT 10`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = app;
