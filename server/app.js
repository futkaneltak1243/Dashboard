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

app.listen(3000, () => {
    console.log("Server started on PORT :3000");
    console.log("Index:\nhttp://localhost:3000/")
});
