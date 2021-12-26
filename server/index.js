const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const signUpRoutes = require("./routes/signUpRoutes");
const directMessagesRoutes = require("./routes/directMessagesRoutes");

require("dotenv").config();

const PORT = process.env.port || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(signUpRoutes);
app.use(directMessagesRoutes);
app.get("/", (req, res) => {
  res.send(`Hello`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
