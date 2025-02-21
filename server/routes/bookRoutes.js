const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Create a new book
router.post("/", async (req, res) => {
  try {
    const { title, author } = req.body;
    const book = await Book.create({ title, author });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

// Get a book by ID
router.get("/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

// Update book details
router.put("/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });

  const { title, author } = req.body;
  await book.update({ title, author });
  res.json(book);
});

module.exports = router;
