const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require('./db');
const formRoutes = require("./routes/formRoutes");
const app = express();

// Middleware
app.use(cors({
    origin: "https://multi-step-form-1-loes.onrender.com", // Update this to your frontend's origin
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
}));

app.use(bodyParser.json());

// Routes
app.use("/api", formRoutes); // API endpoint for form data

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
  });
  
  app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Server encountered an issue' });
  });
  

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
