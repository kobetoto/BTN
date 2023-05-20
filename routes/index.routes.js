//router
const express = require("express");
const router = express.Router();

//homepage
router.get("/", function (req, res, next) {
  res.render("homepage");
});

module.exports = router; //exporte le dossier
