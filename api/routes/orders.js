const express = require("express");

const router = app.router();

router.get("/", (req, res) => {
  res.send("Hello orders");
});

router.get("/", (req, res) => {
  res.send("post orders");
});

module.exports = router;
