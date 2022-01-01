const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

router.route("/updateName").put((req, res) => {
  const newName = req.body.newName;
  const id = req.body.id;

  db.query(
    "UPDATE user SET username=? WHERE user_id=?",
    [newName, id],
    (err, result) => {
      if (err) {
        res.send({ msg: "Name update unsuccessful" });
      } else {
        if (result) {
          res.status(201).send({ msg: `Name has been updated to ${newName}` });
        }
      }
    }
  );
});


module.exports = router;