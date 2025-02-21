const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// Create a new member
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const member = await Member.create({ name, email });
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all members
router.get("/", async (req, res) => {
  const members = await Member.findAll();
  res.json(members);
});

// Get a single member
router.get("/:id", async (req, res) => {
  const member = await Member.findByPk(req.params.id);
  if (!member) return res.status(404).json({ error: "Member not found" });
  res.json(member);
});

// Update a member
router.put("/:id", async (req, res) => {
  const { name, email } = req.body;
  const member = await Member.findByPk(req.params.id);
  if (!member) return res.status(404).json({ error: "Member not found" });
  await member.update({ name, email });
  res.json(member);
});

module.exports = router;
