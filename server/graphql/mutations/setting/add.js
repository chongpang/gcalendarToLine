
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var SettingType = require('../../types/setting');
var SettingModel = require('../../../models/setting');

exports.add = {
  type: SettingType.SettingType,
  args: {
    _id: {
      type: GraphQLString
    },
    schPostTime: {
      type: new GraphQLNonNull(GraphQLString),
    },
    schStart: {
      type: new GraphQLNonNull(GraphQLString),
    },
    schEnd: {
      type: new GraphQLNonNull(GraphQLString),
    },
    autoPost: {
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
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
    updatedBy: {
      type: GraphQLString,
    },
    createdBy: {
      type: GraphQLString,
    },
  },
  resolve(root, params) {
    const cModel = new SettingModel(params);
    const newSetting = cModel.save();
    if (!newSetting) {
      throw new Error('Error');
    }
    return newSetting
  }
}