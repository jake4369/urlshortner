const express = require("express");
const urlShortenerControllers = require("./../controllers/urlShortenerControllers");

const router = express.Router();

router.route("/").post(urlShortenerControllers.shortenUrl);

router.route("/:shortUrl").get(urlShortenerControllers.redirectToOriginalUrl);

module.exports = router;
