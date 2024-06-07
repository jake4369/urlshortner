const express = require("express");
const router = express.Router();
const staticFileControllers = require("./../controllers/staticFileControllers");

router.route("/").get(staticFileControllers.serveStaticFiles);

module.exports = router;
