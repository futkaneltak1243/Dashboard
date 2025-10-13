const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const { Server } = require("socket.io");
const { faker } = require("@faker-js/faker");
const http = require("http");
const chalk = require("chalk");




const app = express();
const db = new sqlite3.Database("database.db");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});
app.use(cors());
app.use(express.json());



app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname));
    },
});

const upload = multer({ storage });


app.post("/api/upload", upload.array("images", 20), (req, res) => {
    if (!req.files || req.files.length === 0)
        return res.status(400).json({ error: "No files uploaded" });

    const urls = req.files.map(
        (file) => `http://localhost:3000/uploads/${file.filename}`
    );

    res.json({ urls });
});


/** Dashboard API */

app.get("/api/dashboard", (req, res) => {
    const queries = {
        users: "SELECT COUNT(*) AS count FROM users",
        orders: "SELECT COUNT(*) AS count FROM orders",
        products: "SELECT COUNT(*) AS count FROM products",
        exhibitions: "SELECT COUNT(*) AS count FROM exhibitions",
    };

    const result = {};

    // Function to execute each query sequentially
    db.serialize(() => {
        db.get(queries.users, (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            result.users = row.count;

            db.get(queries.orders, (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                result.orders = row.count;

                db.get(queries.products, (err, row) => {
                    if (err) return res.status(500).json({ error: err.message });
                    result.products = row.count;

                    db.get(queries.exhibitions, (err, row) => {
                        if (err) return res.status(500).json({ error: err.message });
                        result.exhibitions = row.count;

                        // All queries done → send response
                        res.json(result);
                    });
                });
            });
        });
    });
});


// Get the only Super Admin
app.get("/api/super-admin", (req, res) => {
    const sql = "SELECT * FROM users WHERE role = 'Super Admin' LIMIT 1";

    db.get(sql, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Super Admin not found." });
        res.status(200).json({ data: row });
    });
});

// Update the Super Admin
app.put("/api/super-admin", async (req, res) => {
    const { fullname, username, email, status, avatar, password } = req.body;

    // Validate required fields
    if (!fullname || !username || !email || !status || !avatar) {
        return res.status(400).json({
            error: "fullname, username, email, status, and avatar are required.",
        });
    }

    try {
        // Check if Super Admin exists
        db.get("SELECT id FROM users WHERE role = 'Super Admin' LIMIT 1", async (err, user) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!user) return res.status(404).json({ error: "Super Admin not found." });

            const fields = ["fullname", "username", "email", "status", "avatar"];
            const params = [fullname, username, email, status, avatar];

            // Handle optional password update
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                fields.push("password");
                params.push(hashedPassword);
            }

            const setClause = fields.map(field => `${field} = ?`).join(", ");
            const sql = `UPDATE users SET ${setClause} WHERE role = 'Super Admin'`;

            db.run(sql, params, function (err) {
                if (err) {
                    if (err.message.includes("UNIQUE constraint failed")) {
                        return res
                            .status(409)
                            .json({ error: "Username or email already exists." });
                    }
                    return res.status(500).json({ error: err.message });
                }

                res.status(200).json({
                    message: "Super Admin updated successfully",
                    data: {
                        fullname,
                        username,
                        email,
                        status,
                        avatar,
                    },
                });
            });
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to update Super Admin." });
    }
});



/** 🔹 USERS API */
app.get("/api/users", (req, res) => {
    const { status, role, name, page = 1, limit = 10 } = req.query;

    const filters = [];
    const params = [];

    if (status) {
        const statuses = Array.isArray(status) ? status : [status];
        filters.push(`status IN (${statuses.map(() => "?").join(",")})`);
        params.push(...statuses);
    }

    if (role) {
        const roles = Array.isArray(role) ? role : [role];
        filters.push(`role IN (${roles.map(() => "?").join(",")})`);
        params.push(...roles);
    }

    if (name) {
        filters.push(`fullname LIKE ?`);
        params.push(`%${name}%`);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const baseSql = `FROM users ${whereClause}`;
    const sql = `SELECT * ${baseSql} LIMIT ? OFFSET ?`;
    const countSql = `SELECT COUNT(*) AS total ${baseSql}`;
    const finalParams = [...params, parseInt(limit), offset];

    db.get(countSql, params, (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message });

        db.all(sql, finalParams, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            const total = countResult.total;
            res.status(200).json({
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit),
                count: rows.length,
                data: rows,
            });
        });
    });
});



app.post("/api/users", async (req, res) => {
    const { fullname, username, email, role, status, avatar = null, password } = req.body;

    // Simple validation
    if (!fullname || !username || !email || !role || !status || !password) {
        return res.status(400).json({ error: "fullname, username, email, role, status, and password are required." });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (fullname, username, email, role, status, avatar, password)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [fullname, username, email, role, status, avatar, hashedPassword];

        db.run(sql, params, function (err) {
            if (err) {
                if (err.message.includes("UNIQUE constraint failed")) {
                    return res.status(409).json({ error: "Username or email already exists." });
                }
                return res.status(500).json({ error: err.message });
            }

            // Return the newly created user (never return the password!)
            const newUser = {
                id: this.lastID,
                fullname,
                username,
                email,
                role,
                status,
                avatar
            };

            res.status(201).json({ message: "User created successfully", data: newUser });
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to hash password." });
    }
});

app.put("/api/users/:id", async (req, res) => {
    const { id } = req.params;
    const { fullname, username, email, role, status, avatar = null, password } = req.body;

    if (!fullname || !username || !email || !role || !status) {
        return res.status(400).json({ error: "fullname, username, email, role, and status are required." });
    }

    try {
        // Check if user exists and whether they are a Super Admin
        db.get("SELECT role FROM users WHERE id = ?", [id], async (err, user) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!user) return res.status(404).json({ error: "User not found." });

            // Prevent updating Super Admin
            if (user.role === "Super Admin") {
                return res.status(400).json({ error: "You cannot update a Super Admin." });
            }

            const fields = ["fullname", "username", "email", "role", "status", "avatar"];
            const params = [fullname, username, email, role, status, avatar];

            // Handle password if provided
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                fields.push("password");
                params.push(hashedPassword);
            }

            const setClause = fields.map(field => `${field} = ?`).join(", ");
            const sql = `UPDATE users SET ${setClause} WHERE id = ?`;
            params.push(id);

            db.run(sql, params, function (err) {
                if (err) {
                    if (err.message.includes("UNIQUE constraint failed")) {
                        return res.status(409).json({ error: "Username or email already exists." });
                    }
                    return res.status(500).json({ error: err.message });
                }

                if (this.changes === 0) {
                    return res.status(404).json({ error: "User not found." });
                }

                res.status(200).json({
                    message: "User updated successfully",
                    data: {
                        id: Number(id),
                        fullname,
                        username,
                        email,
                        role,
                        status,
                        avatar
                    },
                });
            });
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to update user." });
    }
});

app.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;

    // First, check if the user exists and their role
    db.get("SELECT role FROM users WHERE id = ?", [id], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: "User not found." });

        // Prevent deleting Super Admin
        if (user.role === "Super Admin") {
            return res.status(400).json({ error: "You cannot delete a Super Admin." });
        }

        // Proceed to delete
        db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "User not found." });

            res.status(200).json({ message: "User deleted successfully", id: Number(id) });
        });
    });
});

/** 🔹 PRODUCTS API */
app.get("/api/products", (req, res) => {
    const { name, isfavorite, page = 1, limit = 9 } = req.query;
    const filters = [];
    const params = [];

    // Search by name
    if (name) {
        filters.push(`name LIKE ?`);
        params.push(`%${name}%`);
    }

    // Filter by favorite (expects 0 or 1)
    if (isfavorite !== undefined) {
        filters.push(`isfavorite = ?`);
        params.push(Number(isfavorite));
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const baseSql = `FROM products ${whereClause}`;
    const sql = `SELECT * ${baseSql} LIMIT ? OFFSET ?`;
    const countSql = `SELECT COUNT(*) AS total ${baseSql}`;
    const finalParams = [...params, parseInt(limit), offset];

    // First, count total items
    db.get(countSql, params, (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message });

        // Then, fetch paginated data
        db.all(sql, finalParams, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            // Parse images JSON
            const data = rows.map(row => ({
                ...row,
                images: JSON.parse(row.images)
            }));

            const total = countResult.total;
            res.status(200).json({
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit),
                count: data.length,
                data
            });
        });
    });
});


app.post("/api/products", (req, res) => {
    const { name, price, images, isfavorite } = req.body;

    if (!name || !price || !images)
        return res.status(400).json({ error: "Missing required fields" });

    const sql = `
      INSERT INTO products (name, price, images, isfavorite)
      VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [name, price, JSON.stringify(images), isfavorite || 0], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({
            id: this.lastID,
            name,
            price,
            images,
            isfavorite: isfavorite || 0,
        });
    });
});


app.put("/api/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, price, images, isfavorite } = req.body;

    // Validate required fields
    if (!name || !price || !images)
        return res.status(400).json({ error: "Missing required fields" });

    const sql = `
        UPDATE products
        SET name = ?, price = ?, images = ?, isfavorite = ?
        WHERE id = ?
    `;

    db.run(sql, [name, price, JSON.stringify(images), isfavorite || 0, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        if (this.changes === 0)
            return res.status(404).json({ error: "Product not found" });

        res.status(200).json({
            id: Number(id),
            name,
            price,
            images,
            isfavorite: isfavorite || 0,
            message: "Product updated successfully",
        });
    });
});

app.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM products WHERE id = ?`;

    db.run(sql, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        if (this.changes === 0)
            return res.status(404).json({ error: "Product not found" });

        res.status(200).json({ message: "Product deleted successfully" });
    });
});

app.put("/api/products/:id/favorite", (req, res) => {
    const { id } = req.params;
    const { isfavorite } = req.body;

    // Validation
    if (isfavorite === undefined)
        return res.status(400).json({ error: "isfavorite is required" });

    const sql = `UPDATE products SET isfavorite = ? WHERE id = ?`;

    db.run(sql, [Number(isfavorite), id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        if (this.changes === 0)
            return res.status(404).json({ error: "Product not found" });

        res.status(200).json({
            id: Number(id),
            isfavorite: Number(isfavorite),
        });
    });
});



/** 🔹 PARTNERS API */
app.get("/api/partners", (req, res) => {
    const { name, type, page = 1, limit = 10 } = req.query;
    const filters = [];
    const params = [];

    if (name) {
        filters.push(`name LIKE ?`);
        params.push(`%${name}%`);
    }

    if (type) {
        const types = Array.isArray(type) ? type : [type];
        filters.push(`type IN (${types.map(() => "?").join(",")})`);
        params.push(...types);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const baseSql = `FROM partners ${whereClause}`;
    const sql = `SELECT * ${baseSql} LIMIT ? OFFSET ?`;
    const countSql = `SELECT COUNT(*) AS total ${baseSql}`;
    const finalParams = [...params, parseInt(limit), offset];

    db.get(countSql, params, (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message });

        db.all(sql, finalParams, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            const total = countResult.total;
            res.status(200).json({
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit),
                count: rows.length,
                data: rows,
            });
        });
    });
});


/** 🔹 PARTNERS CRUD API */

// ➤ Create partner
app.post("/api/partners", (req, res) => {
    const { name, company, email, type, joined } = req.body;

    if (!name || !company || !email || !type || !joined) {
        return res.status(400).json({ error: "name, company, email, type, and joined are required." });
    }

    const sql = `
        INSERT INTO partners (name, company, email, type, joined)
        VALUES (?, ?, ?, ?, ?)
    `;
    const params = [name, company, email, type, joined];

    db.run(sql, params, function (err) {
        if (err) {
            if (err.message.includes("UNIQUE constraint failed")) {
                return res.status(409).json({ error: "Email or company already exists." });
            }
            return res.status(500).json({ error: err.message });
        }

        const newPartner = {
            id: this.lastID,
            name,
            company,
            email,
            type,
            joined,
        };

        res.status(201).json({ message: "Partner created successfully", data: newPartner });
    });
});

// ➤ Update partner
app.put("/api/partners/:id", (req, res) => {
    const { id } = req.params;
    const { name, company, email, type, joined } = req.body;

    if (!name || !company || !email || !type || !joined) {
        return res.status(400).json({ error: "name, company, email, type, and joined are required." });
    }

    // Check if partner exists
    db.get("SELECT * FROM partners WHERE id = ?", [id], (err, partner) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!partner) return res.status(404).json({ error: "Partner not found." });

        const sql = `
            UPDATE partners
            SET name = ?, company = ?, email = ?, type = ?, joined = ?
            WHERE id = ?
        `;
        const params = [name, company, email, type, joined, id];

        db.run(sql, params, function (err) {
            if (err) {
                if (err.message.includes("UNIQUE constraint failed")) {
                    return res.status(409).json({ error: "Email or company already exists." });
                }
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: "Partner not found." });
            }

            res.status(200).json({
                message: "Partner updated successfully",
                data: {
                    id: Number(id),
                    name,
                    company,
                    email,
                    type,
                    joined,
                },
            });
        });
    });
});

// ➤ Delete partner
app.delete("/api/partners/:id", (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM partners WHERE id = ?", [id], (err, partner) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!partner) return res.status(404).json({ error: "Partner not found." });

        db.run("DELETE FROM partners WHERE id = ?", [id], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "Partner not found." });

            res.status(200).json({ message: "Partner deleted successfully", id: Number(id) });
        });
    });
});


/** 🔹 EXHIBITIONS API */
app.get("/api/exhibitions", (req, res) => {
    const { title, status, page = 1, limit = 10 } = req.query;
    const filters = [];
    const params = [];

    if (title) {
        filters.push(`title LIKE ?`);
        params.push(`%${title}%`);
    }

    if (status) {
        const statuses = Array.isArray(status) ? status : [status];
        filters.push(`status IN (${statuses.map(() => "?").join(",")})`);
        params.push(...statuses);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const baseSql = `FROM exhibitions ${whereClause}`;
    const sql = `SELECT * ${baseSql} LIMIT ? OFFSET ?`;
    const countSql = `SELECT COUNT(*) AS total ${baseSql}`;
    const finalParams = [...params, parseInt(limit), offset];

    db.get(countSql, params, (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message });

        db.all(sql, finalParams, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            const total = countResult.total;
            res.status(200).json({
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit),
                count: rows.length,
                data: rows,
            });
        });
    });
});


/** 🔹 CREATE EXHIBITION */
app.post("/api/exhibitions", (req, res) => {
    const { name, title, location, organizer, start_date, end_date, capacity, status } = req.body;

    if (!name || !title || !location || !organizer || !start_date || !end_date || !capacity || !status) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const sql = `
      INSERT INTO exhibitions (name, title, location, organizer, start_date, end_date, capacity, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [name, title, location, organizer, start_date, end_date, capacity, status];

    db.run(sql, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });

        const newExhibition = {
            id: this.lastID,
            name,
            title,
            location,
            organizer,
            start_date,
            end_date,
            capacity,
            status
        };

        res.status(201).json({ message: "Exhibition created successfully", data: newExhibition });
    });
});



/** 🔹 UPDATE EXHIBITION */
app.put("/api/exhibitions/:id", (req, res) => {
    const { id } = req.params;
    const { name, title, location, organizer, start_date, end_date, capacity, status } = req.body;

    if (!name || !title || !location || !organizer || !start_date || !end_date || !capacity || !status) {
        return res.status(400).json({ error: "All fields are required." });
    }

    db.get("SELECT * FROM exhibitions WHERE id = ?", [id], (err, exhibition) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!exhibition) return res.status(404).json({ error: "Exhibition not found." });

        const sql = `
        UPDATE exhibitions
        SET name = ?, title = ?, location = ?, organizer = ?, start_date = ?, end_date = ?, capacity = ?, status = ?
        WHERE id = ?
      `;
        const params = [name, title, location, organizer, start_date, end_date, capacity, status, id];

        db.run(sql, params, function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "Exhibition not found." });

            res.status(200).json({
                message: "Exhibition updated successfully",
                data: { id: Number(id), name, title, location, organizer, start_date, end_date, capacity, status }
            });
        });
    });
});


/** 🔹 DELETE EXHIBITION */
app.delete("/api/exhibitions/:id", (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM exhibitions WHERE id = ?", [id], (err, exhibition) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!exhibition) return res.status(404).json({ error: "Exhibition not found." });

        db.run("DELETE FROM exhibitions WHERE id = ?", [id], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "Exhibition not found." });

            res.status(200).json({ message: "Exhibition deleted successfully", id: Number(id) });
        });
    });
});


/** 🔹 ORDERS API  */
app.get("/api/orders", (req, res) => {
    const { date, status, page = 1, limit = 10 } = req.query;
    const filters = [];
    const params = [];

    if (date) {
        const dates = Array.isArray(date) ? date : [date];
        filters.push(`o.date IN (${dates.map(() => "?").join(",")})`);
        params.push(...dates);
    }

    if (status) {
        const statuses = Array.isArray(status) ? status : [status];
        filters.push(`o.status IN (${statuses.map(() => "?").join(",")})`);
        params.push(...statuses);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const baseSql = `
        FROM orders o
        JOIN users u ON o.user_id = u.id
        LEFT JOIN orders_products op ON o.id = op.order_id
        LEFT JOIN products p ON op.product_id = p.id
        ${whereClause}
    `;

    // ✅ Add user email + total sum
    const sql = `
        SELECT 
            o.id,
            o.address,
            o.date,
            o.status,
            u.fullname AS user_fullname,
            u.email AS user_email,
            COALESCE(SUM(p.price), 0) AS total,
            COALESCE(
                json_group_array(
                    json_object('name', p.name, 'price', p.price)
                ), '[]'
            ) AS products
        ${baseSql}
        GROUP BY o.id
        LIMIT ? OFFSET ?
    `;

    const countSql = `SELECT COUNT(DISTINCT o.id) AS total ${baseSql}`;
    const finalParams = [...params, parseInt(limit), offset];

    db.get(countSql, params, (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message });

        db.all(sql, finalParams, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            const formattedRows = rows.map(row => ({
                ...row,
                total: parseFloat(row.total || 0),
                products: JSON.parse(row.products)
            }));

            const total = countResult.total;
            res.status(200).json({
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit),
                count: formattedRows.length,
                data: formattedRows,
            });
        });
    });
});

app.get("/api/notifications", (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const baseSql = `FROM notifications`;
    const sql = `SELECT * ${baseSql} ORDER BY id DESC LIMIT ? OFFSET ?`;
    const countSql = `SELECT COUNT(*) AS total ${baseSql}`;

    db.get(countSql, [], (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message });

        db.all(sql, [parseInt(limit), offset], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            const total = countResult.total;
            res.status(200).json({
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages: Math.ceil(total / limit),
                count: rows.length,
                data: rows,
            });
        });
    });
});


app.get("/api/search", (req, res) => {
    const { key } = req.query;
    if (!key) {
        return res.status(400).json({ error: "Search key is required." });
    }

    const searchTerm = `%${key}%`;

    const queries = [
        {
            sql: "SELECT fullname AS name FROM users WHERE fullname LIKE ? LIMIT 3",
            location: "Users",
            linkPrefix: "users?name=",
        },
        {
            sql: "SELECT name FROM partners WHERE name LIKE ? LIMIT 3",
            location: "Partners",
            linkPrefix: "partners?name=",
        },
        {
            sql: "SELECT title FROM exhibitions WHERE title LIKE ? LIMIT 3",
            location: "Exhibitions",
            linkPrefix: "exhibitions?title=",
        },
        {
            sql: "SELECT name FROM products WHERE name LIKE ? LIMIT 3",
            location: "Products",
            linkPrefix: "products?name=",
        },
    ];

    const allResults = [];
    let completed = 0;

    queries.forEach(({ sql, location, linkPrefix }) => {
        db.all(sql, [searchTerm], (err, rows) => {
            completed++;

            if (!err && rows.length > 0) {
                rows.forEach((row) => {
                    const keyName = row.name || row.title;
                    allResults.push({
                        location,
                        key: keyName,
                        link: `${linkPrefix}${encodeURIComponent(keyName)}`,
                    });
                });
            }

            // After all 4 queries finish
            if (completed === queries.length) {
                if (allResults.length === 0) {
                    return res.status(200).json([]);
                }

                // Try to interleave results from different tables
                const grouped = {};
                allResults.forEach((r) => {
                    if (!grouped[r.location]) grouped[r.location] = [];
                    grouped[r.location].push(r);
                });

                const mixed = [];
                let added = true;
                while (mixed.length < 3 && added) {
                    added = false;
                    for (const loc of ["Users", "Partners", "Exhibitions", "Products"]) {
                        if (grouped[loc] && grouped[loc].length > 0 && mixed.length < 3) {
                            mixed.push(grouped[loc].shift());
                            added = true;
                        }
                    }
                }

                res.status(200).json(mixed);
            }
        });
    });
});


/**
 * handle server actions + sending notifications
 */

function getRandomUser(excludeRole = null) {
    return new Promise((resolve, reject) => {
        const sql = excludeRole
            ? `SELECT * FROM users WHERE role != ? ORDER BY RANDOM() LIMIT 1`
            : `SELECT * FROM users ORDER BY RANDOM() LIMIT 1`;
        const params = excludeRole ? [excludeRole] : [];
        db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)));
    });
}

function getRandomProduct() {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM products ORDER BY RANDOM() LIMIT 1`, [], (err, row) =>
            err ? reject(err) : resolve(row)
        );
    });
}

function createNotification(type, message) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO notifications (type, message) VALUES (?, ?)`,
            [type, message],
            function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            }
        );
    });
}

async function handleUserCreated() {
    const fullname = faker.person.fullName();
    const username = faker.internet.username();
    const email = faker.internet.email();
    const password = bcrypt.hashSync(faker.internet.password(), 10);
    const role = faker.helpers.arrayElement(['Admin', 'Manager', 'Seller', 'Delivery Agent', 'Customer']);
    const status = faker.helpers.arrayElement(["active", "inactive", "pending"]);

    db.run(
        `INSERT INTO users (fullname, username, email, password, role, status, avatar)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [fullname, username, email, password, role, status, faker.image.avatar()],
        async function (err) {
            if (err) return console.error(chalk.red("User create error:"), err.message);

            const message = `${fullname} created his account`;
            await createNotification("user_created", message);
            io.emit("notification", { type: "user_created", message });
            console.log(chalk.green("User created + notification sent"));
        }
    );
}

async function handleUserEdited() {
    const user = await getRandomUser("Super Admin");
    if (!user) return;

    const message = `${user.fullname} edited his account`;
    await createNotification("user_edited", message);
    io.emit("notification", { type: "user_edited", message });
    console.log(chalk.yellow("User edited + notification sent"));
}

async function handleUserDeleted() {
    const user = await getRandomUser("Super Admin");
    if (!user) return;

    db.run(`DELETE FROM users WHERE id = ?`, [user.id], async (err) => {
        if (err) return console.error(chalk.red("User delete error:"), err.message);

        const message = `${user.fullname} deleted his account`;
        await createNotification("user_deleted", message);
        io.emit("notification", { type: "user_deleted", message });
        console.log(chalk.red("User deleted + notification sent"));
    });
}

async function handleOrderCreated() {
    const user = await getRandomUser("Super Admin");
    if (!user) return;

    const address = faker.location.streetAddress();
    const date = new Date().toISOString().split("T")[0];
    const status = faker.helpers.arrayElement([
        'Processing',
        'Rejected',
        'On Hold'
    ]);

    db.run(
        `INSERT INTO orders (user_id, address, date, status) VALUES (?, ?, ?, ?)`,
        [user.id, address, date, status],
        async function (err) {
            if (err) return console.error(chalk.red("Order create error:"), err.message);

            const orderId = this.lastID;

            // Link random product
            const product = await getRandomProduct();
            db.run(
                `INSERT INTO orders_products (order_id, product_id) VALUES (?, ?)`,
                [orderId, product.id]
            );

            const message = `${user.fullname} made the order ${orderId}`;
            await createNotification("order_created", message);
            io.emit("notification", { type: "order_created", message });
            console.log(chalk.green("Order created + notification sent"));
        }
    );
}

function chooseAction() {
    const roll = Math.random() * 14;
    if (roll < 4) return "order_created";
    if (roll < 8) return "user_created";
    if (roll < 12) return "user_edited";
    return "user_deleted";
}

setInterval(async () => {
    const action = chooseAction();
    console.log(chalk.cyan(`\nPerforming action: ${action}`));

    switch (action) {
        case "order_created":
            await handleOrderCreated();
            break;
        case "user_created":
            await handleUserCreated();
            break;
        case "user_edited":
            await handleUserEdited();
            break;
        case "user_deleted":
            await handleUserDeleted();
            break;
    }
}, 20_000);


server.listen(3000, () => {
    console.log("Server started on PORT :3000");
    console.log("Index:\nhttp://localhost:3000/");
});
