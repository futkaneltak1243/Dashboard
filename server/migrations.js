const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const chalk = require("chalk");

// Database file name
const DB_FILE = "database.db";

// Delete old database file if it exists
if (fs.existsSync(DB_FILE)) {
  fs.unlinkSync(DB_FILE);
  console.info(chalk.green("Old database deleted."));
}

// Create new database
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error(chalk.red("Error creating database:"), err.message);
  } else {
    console.info(chalk.green("New database created successfully."));
  }
});

// Run migrations
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
      avatar TEXT NULL
    );
  `);

  // Products table
  db.run(`
    CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      images TEXT NOT NULL, -- store JSON string of image URLs
      isfavorite INTEGER DEFAULT 0 -- 0 = false, 1 = true
    );
  `);

  // Partners table
  db.run(`
    CREATE TABLE partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      email TEXT NOT NULL,
      type TEXT NOT NULL,
      joined TEXT NOT NULL -- store as date string
    );
  `);

  // Exhibitions table
  db.run(`
    CREATE TABLE exhibitions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      location TEXT NOT NULL,
      organizer TEXT NOT NULL,
      dates TEXT NOT NULL, -- could be a range stored as string
      capacity INTEGER NOT NULL,
      status TEXT NOT NULL
    );
  `);

  // Orders table
  db.run(`
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      address TEXT NOT NULL,
      date TEXT NOT NULL,
      status TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  // Orders_Products (many-to-many relation)
  db.run(`
    CREATE TABLE orders_products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);

  console.info(chalk.green("All tables created successfully!"));
});

// Close the database connection
db.close();
