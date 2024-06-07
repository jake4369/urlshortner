require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const staticFileRouter = require("./routes/staticRoutes");

// Middleware
app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));

// Router middleware
app.use("/", staticFileRouter);

module.exports = app;
