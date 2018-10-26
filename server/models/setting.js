var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var settingSchema = new Schema({
  email:{
    type: String,
    required: false
  },
  lineChannelSecret: {
    type: String,
    required: false
  },
  lineChannelToken:{
    type: String,
    required: false
  },
  lineUserId:{
    type: String,
    required: false
  },
  schPostTime: {
    type: String,
    required: true
  },
  schStart: {
    type: String,
    required: true
  },
  schEnd: {
    type: String,
    required: true
  },
  autoPost: {
    type: Boolean,
    required: true
  },
  updatedAt: {
    type: String,
    required: false
  },
  createdAt: {
    type: String,
    required: false
  },  
  updatedBy: {
    type: String,
    required: false
  },
  createdBy: {
    type: String,
    required: false
  }
});
var Model = mongoose.model('Setting', settingSchema);
module.exports = Model;
