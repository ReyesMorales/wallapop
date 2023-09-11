const express = require("express");
const router = express.Router();

router.use("/:imageName", require("./getImage"));

module.exports = router;