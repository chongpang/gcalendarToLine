
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var MessageType = require('../../types/message');
var MessageModel = require('../../../models/message');

exports.add = {
  type: MessageType.MessageType,
  args: {
    calStart: {
      type: new GraphQLNonNull(GraphQLString),
    },
    calEnd: {
      type: new GraphQLNonNull(GraphQLString),
    },
    image: {
      type: new GraphQLNonNull(GraphQLString),
    },
    calMsg: {
      type: new GraphQLNonNull(GraphQLString),
    },
    preMsg: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLString,
    },
    createdBy: {
      type: GraphQLString,
    }
  },
  resolve(root, params) {
    const cModel = new MessageModel(params);
    const newMessage = cModel.save();
    if (!newMessage) {
      throw new Error('Error');
    }
    return newMessage
  }
}