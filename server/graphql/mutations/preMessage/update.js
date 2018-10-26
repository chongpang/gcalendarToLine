var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var PreMessageType = require('../../types/preMessage');
var PreMessageModel = require('../../../models/preMessage');

exports.update = {
  type: PreMessageType.PreMessageType,
  args: {
    id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLString)
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    return PreMessageModel.findByIdAndUpdate(
      params.id,
      { $set: { message: params.message } },
      { new: true }
    )
      .catch(err => new Error(err));
  }
}

