const { Schema, model } = require("mongoose");

//creation du model PRODUCT
const productSchema = new Schema(
  {
    nomProduit: String,
    prixKgOuPiece: Number,
    famille: String,
    origine: String,
    description: String,
    url: String,
  },
  {
    timeStamps: true
  }
);

//exportation du model ORDER
const Product = model("Product", productSchema);

module.exports = Product;
