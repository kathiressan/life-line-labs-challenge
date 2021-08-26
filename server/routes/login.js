const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  const username = req.query.username;
  User.findOne({
    "login.username": username,
  })
    .then((data) =>
      res.json({
        salt: data.login.salt,
        md5: data.login.md5,
      })
    )
    .catch((e) => res.json({ message: e }));
});

module.exports = router;
