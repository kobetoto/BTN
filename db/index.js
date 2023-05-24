const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/BTN";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    //const databaseName = x.connection[0].name;
    console.log(`Connected to Mongo!! Database name: btn`);
  })
  .catch((err) => {
    console.log("error to connecting to Mongo: ", err);
  });
