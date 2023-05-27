//router
const express = require("express");
const router = express.Router();

//bodyparser
const bodyparser = require("body-parser");
router.use(bodyparser.urlencoded({ extend: true }));

//recupere le User model
const User = require("../models/user.model");

//bcrypt

//signup GET/POST
router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.post("/signup", function (req, res, next) {
  console.log("SIGNUP ===> req.body ===>", req.body);

  new User({
    email: req.body.email,
    password: req.body.password,
  })
    .save()
    .then(function (newUserFromDB) {
      res.redirect("userPage", { email: req.body.email });
    })
    .catch((err) =>
      console.log("err lors de la sauvegarde de l'user dans la DB", err)
    );
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

router.get("/userPage", function (req, res, next) {
  res.render("userPage");
});


// GET/ userPage

router.get('/user', (req, res) => res.render('users/userpage'));
router.get('/useredit', (req, res) => res.render('auth/useredit'));


// GET/ contact

router.get('/contact', (req, res) => res.render('auth/contact'));

// GET/ calendrier

router.get('/calendrier', (req, res) => res.render('auth/calendrier'));

//GET/ commande

router.get('/commande', (req, res) => res.render('auth/commande'));

// GET / panier

router.get('/panier', (req, res) => res.render('auth/panier'));

// GET / fiche produits

router.get('/ficheproduit', (req, res) => res.render('auth/ficheProduits'));


module.exports = router; //exporte le dossier