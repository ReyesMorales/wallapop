const express = require('express');
const router = express.Router();
const User = require("../../../models/User.js");

router.get("/", async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ emailToken: token });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      res.redirect("/logout");
    } else {
      res.redirect("http://localhost:3000/");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
