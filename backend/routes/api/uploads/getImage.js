const express = require('express');
const router = express.Router();
const path = require('path');

router.get("/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const ext = path.extname(imageName);

  if (ext === ".jpeg" || ext === ".jpg") {
    res.setHeader("Content-Type", "image/jpeg");
  } else if (ext === ".png") {
    res.setHeader("Content-Type", "image/png");
  }

  res.sendFile(path.join(__dirname, "../../public/uploads", imageName));
});

module.exports = router;
