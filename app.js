//.ENV
require("dotenv").config();
//console.log("dotenv ===>", process.env.COUCOU);

//express
const express = require("express");
const app = express();

//cookies
require("./session.config")(app);

//exp.static
app.use(express.static("public"));

//hbs
app.set("view engine", "hbs");

//connect to the database
require("./db");

//require routes
const indexRoutes = require("./routes/index.routes.js");
const authRoutes = require("./routes/auth.routes.js");
//"monter le router⚒️"
app.use("/", indexRoutes);
app.use("/", authRoutes);

app.listen(3000, function () {
  console.log("hello local host 3000 ;)");
});

//signUp              OK
//login               OK
//cookie              OK
//UserPage            NON   information user
//userEdit            NON   information user
//Commande            NON   affichage des produits + selection des produits et ajout au panier
//req res next          trouver les product en base             res.render template hbs avec each chaque produits
//Panier              NON   affichage des produits dans le tableau et calcul du total (lab-dom-ironhack-cart)
//ficheProduit        NON
//contact             NON
