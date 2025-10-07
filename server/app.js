const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const db = new sqlite3.Database("database.db");

app.use(cors());
app.use(express.json());
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

    // Validate input
    if (!fullname || !username || !email || !role || !status) {
        return res.status(400).json({ error: "fullname, username, email, role, and status are required." });
    }

    try {
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
    } catch (err) {
        res.status(500).json({ error: "Failed to update user." });
    }
});


/** 🔹 PRODUCTS API */
app.get("/api/products", (req, res) => {
    const { name, isfavorite, page = 1, limit = 10 } = req.query;
    const filters = [];
    const params = [];

    if (name) {
        filters.push(`name LIKE ?`);
        params.push(`%${name}%`);
    }

    if (isfavorite !== undefined) {
        filters.push(`isfavorite = ?`);
        params.push(parseInt(isfavorite));
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const baseSql = `FROM products ${whereClause}`;
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

/** 🔹 ORDERS API */
app.get("/api/orders", (req, res) => {
    const { date, status, page = 1, limit = 10 } = req.query;
    const filters = [];
    const params = [];

    if (date) {
        filters.push(`o.date = ?`);
        params.push(date);
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

    const sql = `
        SELECT 
            o.id,
            o.address,
            o.date,
            o.status,
            u.fullname AS user_fullname,
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

app.listen(3000, () => {
    console.log("Server started on PORT :3000");
    console.log("Index:\nhttp://localhost:3000/");
});
