require("dotenv").config();
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // For Aiven SSL
  },
  multipleStatements: true // Allow multiple SQL statements
});

const sqlFile = path.join(__dirname, "../personal_notes.sql");

fs.readFile(sqlFile, "utf8", (err, sql) => {
  if (err) {
    console.error("Error reading SQL file:", err);
    return;
  }

  db.connect((err) => {
    if (err) {
      console.error("DB Connection Error:", err);
      return;
    }
    console.log("Database Connected");

    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error executing SQL:", err);
        return;
      }
      console.log("Database seeded successfully");
      db.end();
    });
  });
});