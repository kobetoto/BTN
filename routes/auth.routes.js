//router
const express = require("express");
const router = express.Router();

//bodyparser
const bodyparser = require("body-parser");
router.use(bodyparser.urlencoded({ extend: true }));

//signup GET/POST
router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.post("/signup", function (req, res, next) {
  console.log("SIGNUP ===> req.body ===>", req.body);
  res.render("signup", {
    email: req.body.email,
    password: req.body.password,
  });
});

//login GET/POST
router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login", function (req, res, next) {
  console.log("LOGIN ===> req.body ===>", req.body);
  res.render("login", {
    email: req.body.email,
    password: req.body.password,
  });
});

module.exports = router; //exporte le dossier
