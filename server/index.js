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
const getDataRoutes = require("./routes/getDataRoutes");
const groupMessagesRoutes = require("./routes/groupMessageRoutes");
const updateRoutes = require("./routes/updateRoutes")

require("dotenv").config();

const PORT = process.env.port || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(signUpRoutes);
app.use(directMessagesRoutes);
app.use(getDataRoutes);
app.use(groupMessagesRoutes);
app.use(updateRoutes)
app.get("/", (req, res) => {
  res.send(`Hello`);
});
app.get("/ProfilePic/:path", (req, res) => {
  res.download("./ProfilePic/" + req.params.path);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
