const express = require("express");
const Users = require("../models/Users");

const router = express.Router();

router.post("/register", (req, res) => {
  res.send("Im the register");
});

router.post("/login", (req, res) => {
  res.send("Im the login");
});

module.exports = router;
