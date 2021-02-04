const express = require("express");
const Users = require("../models/Users");
const crypto = require("crypto");

const router = express.Router();

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  crypto.randomBytes(16, (err, salt) => {
    const newSalt = salt.toString("base64");
    crypto.pbkdf2(password, newSalt, 10000, 64, "sha1", (err, key) => {
      const encryptedPassword = key.toString("base64");
      Users.findOne({ email })
        .exec()
        .then((user) => {
          if (user) {
            return res.send("User already exist");
          }
          Users.create({
            email,
            password: encryptedPassword,
            salt: newSalt,
          }).then(() => {
            res.send("create user succesful");
          });
        });
    });
  });
});

router.post("/login", (req, res) => {
  res.send("Im the login");
});

module.exports = router;
