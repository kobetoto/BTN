const mongoose = require("mongoose");

//creation du model PRODUCT
const productSchema = new Schema(
  {
    nomProduit: String,
    prixKilo: Number,
    family: String,
    description: String,
  },
  {
    timeStamps: true,
  }
);

//exportation du model ORDER
module.exports = mongoose.model("product", productSchema);
