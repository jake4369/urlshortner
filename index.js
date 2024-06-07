require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const staticFileRouter = require("./routes/staticRoutes");
const urlShortenerRouter = require("./routes/urlShortenerRoutes");

// Middleware
app.use(cors());
app.use("/public", express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({ extended: true }));

// Router middleware
app.use("/", staticFileRouter);
app.use("/api/shorturl", urlShortenerRouter);

module.exports = app;
