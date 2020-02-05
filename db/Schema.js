const mongoose = require('mongoose');
const schema = mongoose.Schema;

const grocery = new schema({
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

mongoose.model('grocery', grocery);

module.exports = mongoose;