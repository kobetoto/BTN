//router
const express = require("express");
const router = express.Router();

//bodyparser
const bodyparser = require("body-parser");
router.use(bodyparser.urlencoded({ extend: true }));

//recupere le User model
const User = require("../models/user.model");
const Product = require("../models/product.model");
// const ficheProduct = require("../models/ficheproduct.model")

//bcrypt
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);

//signup GET/POST
router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.post("/signup", function (req, res, next) {
  //console.log("SIGNUP ===> req.body ===>", req.body);

  const passwordhash = bcryptjs.hashSync(req.body.password, salt);

  new User({
    email: req.body.email,
    password: passwordhash,
  })
    .save()
    .then(function (newUserFromDB) {
      res.redirect("/login");
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
  //console.log("LOGIN ===> req.body ===>", req.body);

  User.findOne({ email: req.body.email })
    .then(function (userFromDB) {
      if (userFromDB) {
        if (bcryptjs.compareSync(req.body.password, userFromDB.password)) {
          req.session.currentUser = userFromDB; //casier utilisateur
          res.redirect("/userPage");
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

// GET/ userPage
router.get("/userPage", function (req, res, next) {
  console.log("userPAge req.sessID", req.session.currentUser._id);
  if (req.session.currentUser) {
    User.findById(req.session.currentUser._id)
      .then(function (userFromDB) {
        res.render("users/userPage", {
          email: userFromDB.email, //userFromDB attention
          entreprise: userFromDB.nomEntreprise,
          adresse: userFromDB.adressePostale,
          ville: userFromDB.ville,
          tel: userFromDB.telephone,
        });
      })
      .catch();
  } else {
    res.redirect("/login");
  }
});

//GET POST/ UserEdit
router.get("/user/edit", function (req, res, next) {
  //User.find... pour pre remplire les champs du User
  console.log("coucou");
  User.findOne({ email: req.session.currentUser.email })
    .then(function (userFromDB) {
      res.render("users/userEdit", {
        email: userFromDB.email,
        entreprise: userFromDB.nomEntreprise,
        adresse: userFromDB.adressePostale,
        ville: userFromDB.ville,
        tel: userFromDB.telephone,
      });
    })
    .catch();
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
        res.redirect("/userPage");
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

router.get("/commande", (req, res) => {
  // retrieve les datas de la DB (produits)
  Product.find()
    .then((allProductsFromBD) => {
      const products = allProductsFromBD.map((product) => ({
        id: product._id,
        url: product.url,
        nomProduit: product.nomProduit,
        prixKgOuPiece: product.prixKgOuPiece,
        famille: product.famille,
        origine: product.origine,
      }));
      res.render("auth/commande", { products });

    })

    .catch((error) => {
      console.log("Error while getting the products from the DB", error);
      next(error);
    });

});

// GET / panier

router.get("/panier", (req, res) => res.render("auth/panier"));

// GET / fiche produit

router.get("/commande/_Id", (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId)
    .then(laFicheProduct => res.render("ficheproduct", { ficheproduit: laFicheProduct }))


    .catch((error) => {
      console.log("Error while getting the products from the DB", error);
      next(error);
    });
})

module.exports = router; //exporte le dossier
