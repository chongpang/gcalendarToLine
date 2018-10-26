var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  openid: {
    type: String,
    required: false
  },
  avatar: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    required: false
  },
  updateddAt: {
    type: Date,
    required: false
  }
});
var Model = mongoose.model('User', userSchema);
module.exports = Model;
