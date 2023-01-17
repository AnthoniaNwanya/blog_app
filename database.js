const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);

function mongooseDB() {
  mongoose.connect(process.env.MONGO_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB Successfully!");
  });

  mongoose.connection.on("error", (err) => {
    console.log("An error occurred");
    console.log(err);
  });
}

module.exports = { mongooseDB };
