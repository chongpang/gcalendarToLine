var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var MessageType = require('../../types/message');
var MessageModel = require('../../../models/message');

exports.update = {
  type: MessageType.MessageType,
  args: {
    id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLString)
    },
    calMsg: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    return MessageModel.findByIdAndUpdate(
      params.id,
      { $set: { calMsg: params.calMsg } },
      { new: true }
    )
      .catch(err => new Error(err));
  }
}

