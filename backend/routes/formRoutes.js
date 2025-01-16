const express = require("express");
const router = express.Router();
const db = require("../db"); // Import Knex instance

// POST /api/form
router.post("/form", async (req, res) => {
  const { name, email, phone, plan, addons, billing } = req.body;

  if (!name || !email || !phone || !plan || !billing) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const result = await db("forms")
      .insert({
        name,
        email,
        phone,
        plan,
        addons: JSON.stringify(addons),
        billing,
        created_at: new Date(),
      })
      .returning("*");

    res.status(201).json({
      message: "Form data saved successfully!",
      data: result[0],
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Failed to save form data." });
  }
});

module.exports = router;

