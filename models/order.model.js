const mongoose = require("mongoose");

//creation du model ORDER
const orderSchema = new mongoose.Schema(
  {
    product: {
      _id: Number,
      qty: Number,
      price: Number,
    },
    user_id: String,
  },
  {
    timeStamps: true,
  }
);

//exportation du model ORDER
module.exports = mongoose.model("order", orderSchema);
