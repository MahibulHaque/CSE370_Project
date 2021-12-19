const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require("crypto");
const mysql = require("mysql2");
const session = require("express-session");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

router.use(
  session({
    key: "userId",
    secret: "54$she$m213ljgiws$bnfahfs$VBN",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

router
  .route("/register")
  .get((req, res) => {
    res.send("Hello this is the register route");
  })
  .post((req, res) => {
    const username = req.body.username;
    let user_password = req.body.password;
    const user_email = req.body.email;
    const user_id = crypto.randomBytes(16).toString("hex");
    console.log(req.body.username);
    bcrypt.hash(user_password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
      db.query(
        "INSERT INTO user (username,user_password,user_email,user_id) VALUES (?,?,?,?)",
        [username, hash, user_email, user_id],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            if (result) {
              res.send(result);
            } else {
              res.send({ message: "No users found" });
            }
          }
        }
      );
    });
  });

router
  .route("/login")
  .get((req, res) => {
    if(req.session.user){
      res.send({loggedIn:true,user:req.session.user})
    }
    else{
      res.send({loggedIn:false})
    }
  })
  .post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
      "SELECT * FROM user WHERE username = ?;",
      username,
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              req.session.user = result;
              console.log(req.session.user);
              res.send(result);
            } else {
              res.send({ message: "Invalid username/password combination" });
            }
          });
        } else {
          res.send({ message: "No user exists" });
        }
      }
    );
  });

module.exports = router;
