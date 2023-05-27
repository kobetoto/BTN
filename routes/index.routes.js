//router
const express = require("express");
const router = express.Router();

//homepage
router.get("/", function (req, res, next) {
  res.render("homepage");
});

//commande
router.get("/commande", function (req, res, next) {
  res.render("commande");
});

module.exports = router; //exporte le dossier
