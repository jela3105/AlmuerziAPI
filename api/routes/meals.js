const express = require("express");

const router = app.router();

router.get("/", (req, res) => {
  res.send("Hello meals");
});

router.get("/", (req, res) => {
  res.send("post meals");
});

module.exports = router;
