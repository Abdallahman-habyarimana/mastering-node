const express = require("express");
const router = express.router();

router.get("/", (req, res) => {
  res.render("index", { title: "MY Express app", message: "Hello" });
});

module.exports = router;
