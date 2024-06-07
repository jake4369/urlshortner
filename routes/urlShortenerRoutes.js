const express = require("express");
const urlShortenerControllers = require("./../controllers/urlShortenerControllers");

const router = express.Router();

router.route("/").post(urlShortenerControllers.shortenUrl);

module.exports = router;
