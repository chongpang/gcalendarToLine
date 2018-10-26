var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var PreMessageType = require('../../types/preMessage');
var PreMessageModel = require('../../../models/preMessage');

exports.remove = {
  type: PreMessageType.PreMessageType,
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removedPreMessage = PreMessageModel.findByIdAndRemove(params.id).exec();
    if (!removedPreMessage) {
      throw new Error('Error')
    }
    return removedPreMessage;
  }
}
