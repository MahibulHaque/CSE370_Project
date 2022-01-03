const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mysql = require("mysql2");

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../server");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `ProfilePic/${file.originalname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: storage,
});

require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

router.route("/getGroupInfo/:id").get((req, res) => {
  const group_id = req.params.id;
  db.query(
    "SELECT group_name,group_id,group_image FROM group_detail WHERE group_id=?",
    group_id,
    (err, result) => {
      if (err) {
        res.status(400).json({ msg: "Unable retrive group information" });
      } else {
        if (result.length > 0) {
          res.status(200).send(result);
        }
      }
    }
  );
});

router.route("/createGroup").post(upload.single("image"), (req, res) => {
  if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|JFIF)$/)) {
    res.send({ msg: "Only image files (jpg, jpeg, png) are allowed!" });
  }
  const image = req.file.filename;
  const group_name = req.body.name;
  let group_password = req.body.password;
  const creatorID = req.body.creatorID;
  const creatorName = req.body.creatorName;
  const group_id = crypto.randomBytes(16).toString("hex");
  console.log(group_name, group_password, creatorID);

  db.query(
    "INSERT INTO group_detail (group_id,group_name,password,created_by,group_image) VALUES(?,?,?,?,?);",
    [group_id, group_name, group_password, creatorID, image],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ msg: "Group could not be created" });
      } else {
        if (result) {
          db.query(
            "SELECT group_id FROM group_detail WHERE created_by=? AND group_name=? LIMIT 1;",
            [creatorID,group_name],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                if (result.length > 0) {
                  const group_res_id = result[0].group_id;
                  db.query(
                    "INSERT INTO group_users(group_id,group_username,group_userID) VALUES(?,?,?);",
                    [group_res_id, creatorName, creatorID],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                        res.json({
                          msg: "Error in allocating creator in group",
                        });
                      } else {
                        if (result) {
                          res
                            .status(201)
                            .send({ msg: "Group creation successful" });
                        }
                      }
                    }
                  );
                }
              }
            }
          );
        }
      }
    }
  );
});

router.route("/suggestedGroup").get((req, res) => {
  db.query(
    "SELECT group_id,group_name,group_image FROM group_detail GROUP BY group_id LIMIT 5;",
    (err, result) => {
      if (err) {
        res.status(400).json({ msg: "Unable to retrieve groups" });
      } else {
        if (result) {
          res.status(200).send(result);
        }
      }
    }
  );
});

router.route("/groupUser/:id").post((req, res) => {
  const user_id = req.body.userID;
  const grp_id = req.params.id;
  db.query(
    "SELECT * FROM group_users WHERE group_id=? AND group_userID=?",
    [grp_id, user_id],
    (err, result) => {
      if (err) {
        res.status(400).json({ msg: "Unable to find group" });
      } else {
        if (result.length > 0) {
          res.status(200).send({ Ingrp: true });
        } else {
          res.status(200).send({ Ingrp: false });
        }
      }
    }
  );
});

router.route("/joinGroup").post((req, res) => {
  const group_id = req.body.group_id;
  const user_id = req.body.user_id;
  const user_name = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM group_detail WHERE group_id=? AND password=?;",
    [group_id, password],
    (err, result) => {
      if (err) {
        res.status(400).json({ msg: "Password Incorrect!" });
      } else {
        if (result) {
          db.query(
            "INSERT INTO group_users(group_id,group_username,group_userID) VALUES(?,?,?);",
            [group_id, user_name, user_id],
            (err, result) => {
              if (err) {
                res.status(400).json({ msg: "Unable to add into group" });
              } else {
                if (result) {
                  res.status(201).send({ msg: "You have been added to group" });
                }
              }
            }
          );
        }
      }
    }
  );
});

router.route("/postGroupMessage").post((req, res) => {
  const outgoing_id = req.body.outgoing_id;
  const incoming_id = req.body.incoming_id;
  const messageBody = req.body.message;

  db.query(
    "INSERT INTO chatmessages (incoming_msg_id,outgoing_msg_id,messageBody,chat_msg_group_id) VALUES(?,?,?,?);",
    [incoming_id, outgoing_id, messageBody, outgoing_id],
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

router.route("/getGroupMessages/:id").get((req, res) => {
  const grp_id = req.params.id;

  db.query(
    "SELECT * FROM chatmessages AS cm LEFT JOIN user ON user.user_id=cm.incoming_msg_id WHERE (outgoing_msg_id=?) ORDER BY chatMsg_id ASC;",
    grp_id,
    (err, result) => {
      if (err) {
        res.status(400).json({ msg: "Message couldn't be retrived" });
      } else {
        if (result.length > 0) {
          res.status(201).send(result);
        } else {
          res.status(200).send({ msg: "This is the start of conversation" });
        }
      }
    }
  );
});

module.exports = router;
