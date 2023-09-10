const express = require("express");
const router = express.Router();


router.use("/create-user", require("./createUser"));
router.use("/login", require("./login"));
router.use("/logout", require("./logout"));

module.exports = router;