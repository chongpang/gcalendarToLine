
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var PreMessageType = require('../../types/preMessage');
var PreMessageModel = require('../../../models/preMessage');

exports.add = {
  type: PreMessageType.PreMessageType,
  args: {
    datetime: {
      type: new GraphQLNonNull(GraphQLString),
    },
    message: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdBy: {
      type: new GraphQLNonNull(GraphQLString),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    updatedBy: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    const cModel = new PreMessageModel(params);
    const newPreMessage = cModel.save();
    if (!newPreMessage) {
      throw new Error('Error');
    }
    return newPreMessage
  }
}