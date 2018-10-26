
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var MessageModel = require('../../models/message');
var MessageType = require('../types/message').MessageType;
var GraphQLString = require('graphql').GraphQLString;

// Query
exports.queryAllMessageTypes = new GraphQLObjectType({
  name: 'queryAllMessageTypes',
  fields: function () {
    return {
      messages: {
        type: new GraphQLList(MessageType),
        resolve: function () {
          const messages = MessageModel.find().exec()
          if (!messages) {
            throw new Error('Error')
          }
          return messages
        }
      },
      message: {
        type: MessageType,
        args: {
          _id: {
            type: GraphQLString
          }
        },
        resolve: function (parent, param) {
          const message = MessageModel.findOne(param).exec()
          if (!message) {
            throw new Error('Error')
          }
          return message
        }
      }
    }
  }
});


