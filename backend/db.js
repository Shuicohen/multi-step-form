const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.DB_PORT || 5432,
  idleTimeoutMillis: 10000, // Close idle clients after 10 seconds
  connectionTimeoutMillis: 5000, // 5 seconds to establish a connection
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
  keepAlive: true, // Keep the connection alive
});

// Debug pool connections
pool.on("connect", () => console.log("New client connected"));
pool.on("remove", () => console.log("Client removed"));

// Test the database connection
(async () => {
  try {
    await pool.connect();
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection error:", err);
  }
})();

module.exports = pool;
