const mongoose = require('mongoose');
const schema = mongoose.Schema;
const connectDB = require("./connect");
connectDB();

const grocery = new schema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  img: {
    type: String
  },
  weight: {
    type: String
  },
  detail: []
});

mongoose.model('grocery', grocery);

module.exports = mongoose;