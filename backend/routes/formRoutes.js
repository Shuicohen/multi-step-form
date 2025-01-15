const express = require("express");
const router = express.Router();
const db = require("../db"); // Import the connection pool

// POST /api/form
router.post("/form", async (req, res) => {
  const { name, email, phone, plan, addons, billing } = req.body;

  if (!name || !email || !phone || !plan || !billing) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const query = `
    INSERT INTO forms (name, email, phone, plan, addons, billing)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
  `;
  const values = [name, email, phone, plan, JSON.stringify(addons), billing];

  try {
    const { rows } = await db.query(query, values);
    res.status(201).json({ message: "Form data saved successfully!", data: rows[0] });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Failed to save form data." });
  }
});

module.exports = router;
