const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("database.db");



app.use(cors());
app.get("/api/users", (req, res) => {
    const { status, role, name, page = 1, limit = 10 } = req.query;

    // Build filters
    const filters = [];
    const params = [];

    if (status) {
        const statuses = Array.isArray(status) ? status : [status]
        filters.push(`status IN (${statuses.map(() => "?").join(",")})`);
        params.push(...statuses);
    }

    if (role) {
        const roles = Array.isArray(role) ? role : [role]
        filters.push(`role IN (${roles.map(() => "?").join(",")})`);
        params.push(...roles);
    }

    if (name) {
        filters.push(`fullname LIKE ?`);
        params.push(`%${name}%`);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    // Pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const sql = `SELECT * FROM users ${whereClause} LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({
            page: parseInt(page),
            limit: parseInt(limit),
            count: rows.length,
            data: rows,
        });
    });
});

app.get("/api/products", (req, res) => {
    const { name, isfavorite, page = 1, limit = 10 } = req.query;

    // Filters
    const filters = [];
    const params = [];

    if (name) {
        filters.push(`name LIKE ?`);
        params.push(`%${name}%`);
    }

    if (isfavorite !== undefined) {
        filters.push(`isfavorite = ?`);
        params.push(parseInt(isfavorite)); // 0 or 1
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    // Pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const sql = `SELECT * FROM products ${whereClause} LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({
            page: parseInt(page),
            limit: parseInt(limit),
            count: rows.length,
            data: rows,
        });
    });
});

app.get("/api/partners", (req, res) => {
    const { name, type, page = 1, limit = 10 } = req.query;

    const filters = [];
    const params = [];

    // Name search
    if (name) {
        filters.push(`name LIKE ?`);
        params.push(`%${name}%`);
    }

    // Type filter (support multiple types)
    if (type) {
        const types = Array.isArray(type) ? type : [type];
        filters.push(`type IN (${types.map(() => "?").join(",")})`);
        params.push(...types);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    // Pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const sql = `SELECT * FROM partners ${whereClause} LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({
            page: parseInt(page),
            limit: parseInt(limit),
            count: rows.length,
            data: rows,
        });
    });
});


app.get("/api/exhibitions", (req, res) => {
    const { name, status, page = 1, limit = 10 } = req.query;

    const filters = [];
    const params = [];

    // Name search
    if (name) {
        filters.push(`name LIKE ?`);
        params.push(`%${name}%`);
    }

    // Status filter (support multiple statuses)
    if (status) {
        const statuses = Array.isArray(status) ? status : [status];
        filters.push(`status IN (${statuses.map(() => "?").join(",")})`);
        params.push(...statuses);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    // Pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const sql = `SELECT * FROM exhibitions ${whereClause} LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({
            page: parseInt(page),
            limit: parseInt(limit),
            count: rows.length,
            data: rows,
        });
    });
});

app.get("/api/orders", (req, res) => {
    const { date, status, page = 1, limit = 10 } = req.query;

    const filters = [];
    const params = [];

    // Date filter
    if (date) {
        filters.push(`o.date = ?`);
        params.push(date);
    }

    // Status filter (multiple statuses)
    if (status) {
        const statuses = Array.isArray(status) ? status : [status];
        filters.push(`o.status IN (${statuses.map(() => "?").join(",")})`);
        params.push(...statuses);
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    // Pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const sql = `
        SELECT 
            o.id,
            o.address,
            o.date,
            o.status,
            u.fullname AS user_fullname,
            COALESCE(
                json_group_array(
                    json_object(
                        'name', p.name,
                        'price', p.price
                    )
                ), '[]'
            ) AS products
        FROM orders o
        JOIN users u ON o.user_id = u.id
        LEFT JOIN orders_products op ON o.id = op.order_id
        LEFT JOIN products p ON op.product_id = p.id
        ${whereClause}
        GROUP BY o.id
        LIMIT ? OFFSET ?
    `;
    params.push(parseInt(limit), offset);

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Parse JSON strings into actual objects
        const formattedRows = rows.map(row => ({
            ...row,
            products: JSON.parse(row.products)
        }));

        res.status(200).json({
            page: parseInt(page),
            limit: parseInt(limit),
            count: formattedRows.length,
            data: formattedRows,
        });
    });
});


app.listen(3000, () => {
    console.log("Server started on PORT :3000");
    console.log("Index:\nhttp://localhost:3000/")
});
