var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  calStart: {
    type: Date,
    required: true
  },
  calEnd: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  calMsg: {
    type: String,
    required: true
  },
  preMsg: {
    type: String,
    required: false
  },
  createdBy: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    required: false
  }
});
var Model = mongoose.model('Message', messageSchema);
module.exports = Model;
