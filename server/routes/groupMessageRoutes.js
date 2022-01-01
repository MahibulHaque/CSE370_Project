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

router.route("/createGroup").post(upload.single("image"), (req, res) => {
  if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
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
            "SELECT group_id FROM group_detail WHERE created_by=? LIMIT 1;",
            creatorID,
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

module.exports = router;
