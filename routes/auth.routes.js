//router
const express = require("express");
const router = express.Router();

//bodyparser
const bodyparser = require("body-parser");
router.use(bodyparser.urlencoded({ extend: true }));

//recupere le User model
const User = require("../models/user.model");

//bcrypt
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);

//signup GET/POST
router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.post("/signup", function (req, res, next) {
  console.log("SIGNUP ===> req.body ===>", req.body);

  const passwordhash = bcryptjs.hashSync(req.body.password, salt);

  new User({
    email: req.body.email,
    password: passwordhash,
  })
    .save()
    .then(function (newUserFromDB) {
      res.render("users/userPage", { email: req.body.email });
    })
    .catch((err) =>
      console.log("err lors de la sauvegarde de l'user dans la DB", err)
    );
});

//login GET/POST
router.get("/login", function (req, res, next) {
  console.log("req.session ===>", req.session);
  res.render("login");
});

router.post("/login", function (req, res, next) {
  //console.log("LOGIN ===> req.body ===>", req.body);

  User.findOne({ email: req.body.email })
    .then(function (userFromDB) {
      if (userFromDB) {
        if (bcryptjs.compareSync(req.body.password, userFromDB.password)) {
          req.session.currentUser = userFromDB; //casier utilisateur
          res.render("users/userPage", {
            email: req.body.email,
          });
        } else {
          console.log("WRONG ===> username || email || password");
          res.redirect("/login");
        }
      } else {
        res.render("login");
      }
    })
    .catch((err) => console.log("err login", err));
});

router.get("/userPage", function (req, res, next) {
  if (req.session.currentUser) {
    User.findById(req.session.currentUser.id)
      .then(function (userFromDB) {
        res.render("users/userPage", {
          email: req.session.currentUser.email,
          entreprise: req.session.currentUser.nomEntreprise,
          adresse: req.session.currentUser.adressePostale,
          ville: req.session.currentUser.ville,
          tel: req.session.currentUser.telephone,
        });
      })
      .catch();
  } else {
    res.redirect("/login");
  }
});

// GET/ userPage

router.get("/userPage", function (req, res, next) {
  res.render("users/userPage", {
    email: req.session.currentUser.email,
    entreprise: req.session.currentUser.nomEntreprise,
    adresse: req.session.currentUser.adresse,
  });
});

//GET POST/ UserEdit
router.get("/user/edit", function (req, res, next) {
  //User.find... pour pre remplire les champs du User
  res.render("users/userEdit");
});

router.post("/user/edit", function (req, res, next) {
  if (req.session.currentUser) {
    User.findByIdAndUpdate(req.session.currentUser._id, {
      email: req.body.email,
      nomEntreprise: req.body.entreprise,
      adressePostale: req.body.adresse,
      ville: req.body.ville,
      telephone: req.body.telephone,
    })
      .then(function (userFromDB) {
        res.render("users/userPage", {
          email: req.body.email,
          entreprise: req.body.entreprise,
          adresse: req.body.adresse,
          ville: req.body.ville,
          tel: req.body.telephone,
        });
      })
      .catch((err) => console.log("err login", err));
  } else {
    res.redirect("/login");
  }
});

//fin de session
router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.redirect("/");
});

// GET/ contact

router.get("/contact", (req, res) => res.render("auth/contact"));

// GET/ calendrier

router.get("/calendrier", (req, res) => res.render("auth/calendrier"));

//GET/ commande

router.get("/commande", (req, res) => res.render("auth/commande"));

// GET / panier

router.get("/panier", (req, res) => res.render("auth/panier"));

// GET / fiche produits

router.get("/ficheproduit", (req, res) => res.render("auth/ficheProduits"));

module.exports = router; //exporte le dossier
