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

router.route("/getData/:id").get((req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM chatmessages WHERE (DISTINCT incoming_id=?) AND (DISTINCT outgoing_id=?);",
    [id, id],
    (err, result) => {
      if (err) {
        res.status(404).send(err);
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send("No message available");
        }
      }
    }
  );
});

router.route("/suggestedUser/:id").get((req, res) => {
  const user_id = req.params.id;

  db.query(
    "SELECT username,user_id,image FROM user WHERE user_id!=? LIMIT 5;",
    user_id,
    (err, result)=>{
        if(err){
            res.status(404).send(err);
        }
        else{
            res.send(result);
        }
    }
  );
});

module.exports = router;
