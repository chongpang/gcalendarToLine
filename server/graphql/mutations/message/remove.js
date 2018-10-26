var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var MessageType = require('../../types/message');
var MessageModel = require('../../../models/message');

exports.remove = {
  type: MessageType.MessageType,
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removedMessage = MessageType.findByIdAndRemove(params.id).exec();
    if (!removedMessage) {
      throw new Error('Error')
    }
    return removedMessage;
  }
}
