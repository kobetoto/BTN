//router
const express = require("express");
const router = express.Router();

//product Model
const Product = require("../models/product.model");

//homepage
router.get("/", function (req, res, next) {
  res.render("homepage");
});

//commande
router.get("/commande", function (req, res, next) {
  Product.find({})
    .then(function (productsFromDB) {
      res.render("commande", { produits: productsFromDB });
    })
    .catch();
  // 1. requete la DB pour retrieve la liste de tous les produits (Product.find())
  // 2. res.render en lui passant 1.
});

module.exports = router; //exporte le dossier
