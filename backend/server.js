const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Mozik",
    timezone: "Z"
});

app.get("/eloadas", (req, res) => {
    db.query(
        "SELECT id, filmid, moziid, DATE_FORMAT(datum, '%Y-%m-%d') AS datum, nezoszam, bevetel FROM eloadas_txt",
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

app.get("/filmek", (req, res) => {
    db.query("SELECT * FROM film_txt", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.post("/eloadas", (req, res) => {
    const { filmid, moziid, datum, nezoszam, bevetel } = req.body;

    db.query(
        "INSERT INTO eloadas_txt (filmid, moziid, datum, nezoszam, bevetel) VALUES (?, ?, ?, ?, ?)",
        [filmid, moziid, datum, nezoszam, bevetel],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

app.put("/eloadas/:id", (req, res) => {
    const { filmid, moziid, datum, nezoszam, bevetel } = req.body;

    db.query(
        "UPDATE eloadas_txt SET filmid=?, moziid=?, datum=?, nezoszam=?, bevetel=? WHERE id=?",
        [filmid, moziid, datum, nezoszam, bevetel, req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});

app.delete("/eloadas/:id", (req, res) => {
    db.query(
        "DELETE FROM eloadas_txt WHERE id=?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json(err);
            res.sendStatus(204);
        }
    );
});

app.listen(3001, () => console.log("Server fut: http://localhost:3001"));