var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var preMessageSchema = new Schema({
  datetime: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  updatedBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
});
var Model = mongoose.model('PreMessage', preMessageSchema);
module.exports = Model;
