const { Schema, model } = require("mongoose");

//creation du model ficheproduct
const ficheProductSchema = new Schema(
    {
        nomProduit: String,
        prixKgOuPiece: Number,
        famille: String,
        origine: String,
        description: String,
        url: String,
        description: String,
    },
    {
        timeStamps: true
    }
);

//exportation du model ORDER
const ficheProduct = model("ficheProduct", ficheProductSchema);

module.exports = ficheProduct;
