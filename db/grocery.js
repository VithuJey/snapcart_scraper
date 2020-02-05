const mongoose = require('mongoose');

const grocery = new mongoose.Schema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  weight: {
    type: String
  },
  detail: [{
    type: JSON
  }]
});

module.exports = Grocery = mongoose.model('grocery', grocery);