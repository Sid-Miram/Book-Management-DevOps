const express = require("express");
const router = express.Router();
const Issuance = require("../models/Issuance");
const Member = require("../models/Member");
const Book = require("../models/Book");

// Issue a book to a member
router.post("/", async (req, res) => {
  try {
    const { memberId, bookId, issueDate, returnDate } = req.body;

    const member = await Member.findByPk(memberId);
    const book = await Book.findByPk(bookId);
    if (!member || !book) {
      return res.status(404).json({ error: "Member or Book not found" });
    }

    if (!book.available) {
      return res.status(400).json({ error: "Book is already issued" });
    }

    const issuance = await Issuance.create({ MemberId: memberId, BookId: bookId, issueDate, returnDate });
    await book.update({ available: false });

    res.status(201).json(issuance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all issued books
router.get("/", async (req, res) => {
  const issuances = await Issuance.findAll({ include: [Member, Book] });
  res.json(issuances);
});

// Return a book
router.put("/:id", async (req, res) => {
  try {
    const issuance = await Issuance.findByPk(req.params.id);
    if (!issuance) return res.status(404).json({ error: "Issuance record not found" });

    const book = await Book.findByPk(issuance.BookId);
    await issuance.update({ returnDate: new Date() });
    await book.update({ available: true });

    res.json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
