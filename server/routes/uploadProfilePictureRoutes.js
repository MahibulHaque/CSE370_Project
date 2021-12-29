const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
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
