const express = require("express");
const { createConnection, createPool } = require("mysql");
require("dotenv").config();

const app = express();

app.use(express.json());

const db = createPool({
  host: process.env.HOST,
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});

db.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Database connected successfully");
  connection.release();
});

app.get("/api/parent", (req, res) => {
  let readQuery = `select * from parent where status = 0`;

  db.query(readQuery, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
    res.status(200).json({ success: true, data: result });
  });
});

app.get("/api/parent/:id", (req, res) => {
  const parentId = req.params.id;

  if (!parentId) {
    return res.status(400).json({ success: false, message: "Parent id is required!" });
  }

  let readOneQuery = `select * from parent where id = '${parentId}' AND  status = 0`;

  db.query(readOneQuery, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
    res.status(200).json({ success: true, data: result });
  });
});

app.post("/api/parent", (req, res) => {
  let id = `prt` + Math.floor(Math.random() * 10000000000000);
  const { title, firstName, lastName, phone } = req.body;

  if (!title || !firstName || !lastName || !phone) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  let insertQuery = `INSERT INTO parent (id,title, first_name, last_name, phone, status, date) 
  VALUES ('${id}', '${title}', '${firstName}', '${lastName}', '${phone}', 0, NOW())`;

  db.query(insertQuery, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
    res.status(201).json({ success: true, message: "Parent successfully created", data: { id, title, firstName, lastName, phone } });
  });
});

app.put("/api/parent/:id", (req, res) => {
  const { title, firstName, lastName, phone } = req.body;
  const parentId = req.params.id;
  if (!title || !firstName || !lastName || !phone) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  if (!parentId) {
    return res.status(400).json({ success: false, message: "Parent id is required!" });
  }
  const parentData = {
    title,
    first_name: firstName,
    last_name: lastName,
    phone,
  };

  const updateQuery = "UPDATE parent SET ? WHERE id = ?";

  db.query(updateQuery, [parentData, parentId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
    res.status(200).json({ success: true, message: "Parent successfully updated", data: { title, first_name: firstName, last_name: lastName, phone } });
  });
});

app.delete("/api/parent/:id", (req, res) => {
  const parentId = req.params.id;
  if (!parentId) {
    return res.status(400).json({ success: false, message: "Parent id is required!" });
  }

  let deleteQuery = `UPDATE parent SET status = "1" WHERE id = '${parentId}'`;

  db.query(deleteQuery, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Internal server error!" });
    }
    if (result.affectedRows === 0) {
      res.status(404).json("Parent not found");
    } else {
      res.status(200).json({ success: true, message: "Parent successfully deleted" });
    }
  });
});

app.listen(5000, () => console.log("server is running on port 5000"));
