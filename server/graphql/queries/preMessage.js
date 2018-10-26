
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var PreMessageModel = require('../../models/preMessage');
var PreMessageType = require('../types/preMessage').PreMessageType;
var GraphQLString = require('graphql').GraphQLString;

// Query
exports.queryAllPreMessageTypes = new GraphQLObjectType({
  name: 'queryAllPreMessageTypes',
  fields: function () {
    return {
      preMessages: {
        type: new GraphQLList(PreMessageType),
        resolve: function () {
          const preMessages = PreMessageModel.find().exec()
          if (!preMessages) {
            throw new Error('Error')
          }
          return preMessages
        }
      },
      preMessage: {
        type: PreMessageType,
        args: {
          _id: {
            type: GraphQLString
          }
        },
        resolve: function (parent, param) {
          const preMessage = PreMessageModel.findOne(param).exec()
          if (!preMessage) {
            throw new Error('Error')
          }
          return preMessage
        }
      }
    }
  }
});


