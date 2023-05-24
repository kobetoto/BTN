//express
const express = require("express");
const app = express();

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
