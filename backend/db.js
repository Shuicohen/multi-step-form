const knex = require("knex");
require("dotenv").config(); // Load environment variables

const db = knex({
  client: "pg",
  connection: {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.DB_PORT || 5432,
    ssl: { rejectUnauthorized: false }, // Required for Neon
  },
  pool: {
    min: 2,
    max: 10,
  },
});

db.raw("SELECT 1")
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

module.exports = db;
