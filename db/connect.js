const mongoose = require("mongoose");

const URI = "";

const connectDB = async () => {
  // await mongoose.connect(URI, {
  //   useUnifiedTopology: true,
  //   useNewUrlParser: true
  // });
  // console.log("db connected..!");

  mongoose.connect("mongodb://127.0.0.1:27017/market", {
    useNewUrlParser: true
  });
  const connection = mongoose.connection;

  connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });
};

module.exports = connectDB;
