var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLString = require('graphql').GraphQLString;
var SettingType = require('../../types/setting');
var SettingModel = require('../../../models/setting');

exports.update = {
  type: SettingType.SettingType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLString)
    },
    autoPost: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    schStart: {
      type: new GraphQLNonNull(GraphQLString),
    },
    schEnd: {
      type: new GraphQLNonNull(GraphQLString),
    },
    schPostTime: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lineChannelSecret: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lineChannelToken: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lineUserId:{
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    return SettingModel.findByIdAndUpdate(
      params._id,
      { $set: { lineChannelToken: params.lineChannelToken, lineChannelSecret: params.lineChannelSecret, autoPost: params.autoPost, schPostTime: params.schPostTime, schStart: params.schStart, schEnd: params.schEnd  } },
      { new: true }
    )
      .catch(err => new Error(err));
  }
}

