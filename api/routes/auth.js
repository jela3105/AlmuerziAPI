const express = require("express");
const Users = require("../models/Users");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const router = express.Router();

const singToken = (_id) => {
  return jwt.sign({ _id }, "my-secret", {
    expiresIn: 60 * 60 * 24 * 365,
  });
};

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
  const { email, password } = req.body;
  Users.findOne({ email }.exce()).then((user) => {
    if (!user) {
      return res.send("user or password incorrect");
    }

    crypto.pbkdf2(password, user.salt, 10000, 64, "sha1", (err, key) => {
      const encryptedPassword = key.toString("base64");
      if (user.password == encryptedPassword) {
        const token = singToken(user._id);
        return res.send({ token });
      }
      return res.send("User or password incorrect");
    });
  });
});

module.exports = router;
