const express = require("express");
const router = express.Router();


router.use("/create-user", require("./createUser"));
router.use("/login", require("./login"));
router.use("/logout", require("./logout"));
router.use("/verify-email", require("./verifyEmail"));
router.post("/recovery", require("./recovery"));
router.post("/change-password", require("./changePassword"));

module.exports = router;