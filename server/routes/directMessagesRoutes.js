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

router.route("/postMessages").post((req, res) => {
  const outgoing_id = req.body.outgoing_id;
  const incoming_id = req.body.incoming_id;
  const messageBody = req.body.message;

  db.query(
    "INSERT INTO chatmessages (incoming_msg_id,outgoing_msg_id,messageBody) VALUES(?,?,?);",
    [incoming_id, outgoing_id, messageBody],
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        if (result) {
          res.status(201).send(result);
        } else {
          res.status(200).send("Message not sent! Try again later.");
        }
      }
    }
  );
});

router.route("/getMessages").post((req, res) => {
  const main_user_id = req.body.incoming_id;
  const other_user_id = req.body.outgoing_id;
  db.query(
    "SELECT * FROM chatmessages LEFT JOIN user ON user.user_id=chatmessages.incoming_msg_id WHERE (incoming_msg_id=? AND outgoing_msg_id=?) OR(outgoing_msg_id=? AND incoming_msg_id=?) ORDER BY chatMsg_id ASC;",
    [main_user_id, other_user_id,main_user_id,other_user_id],
    (err, result) => {
      if (err) {
        res.status(404).send(err);
      } else {
        if (result.length > 0) {
          res.status(201).send(result);
        } else {
          res.status(200).send("This is will be the start of your conversation");
        }
      }
    }
  );
});

module.exports = router;