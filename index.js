require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

module.exports = app;
