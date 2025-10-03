const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "database.db");

// 1. Delete the old database if exists
if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log("Old database deleted.");
}

// 2. Create a new database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("New database created.");
    }
});

// 3. Run migrations
db.serialize(() => {
    // Users table
    db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullname TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL,
      status TEXT NOT NULL,
      avatar TEXT
    )
  `);

    // Products table
    db.run(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      images TEXT NOT NULL, -- store JSON array of image URLs
      isfavorite INTEGER DEFAULT 0 -- 0 = false, 1 = true
    )
  `);

    // Partners table
    db.run(`
    CREATE TABLE partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      email TEXT NOT NULL,
      type TEXT NOT NULL,
      joind TEXT NOT NULL -- date string
    )
  `);

    // Exhibitions table
    db.run(`
    CREATE TABLE exhibitions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      location TEXT NOT NULL,
      organizer TEXT NOT NULL,
      dates TEXT NOT NULL, -- could store as JSON or string range
      capacity INTEGER NOT NULL,
      status TEXT NOT NULL
    )
  `);

    // Orders table
    db.run(`
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

    // Orders_Products pivot table
    db.run(`
    CREATE TABLE orders_products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

    console.log("Migrations completed.");
});

// Close the DB after finishing
db.close((err) => {
    if (err) {
        console.error("Error closing database:", err.message);
    } else {
        console.log("Database connection closed.");
    }
});
