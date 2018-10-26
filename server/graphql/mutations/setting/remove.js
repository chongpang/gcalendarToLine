var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var SettingType = require('../../types/setting');
var SettingModel = require('../../../models/setting');

exports.remove = {
  type: SettingType.SettingType,
  args: {
    id: {
      name: "_id",
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removedSetting = SettingModel.findByIdAndRemove(params.id).exec();
    if (!removedSetting) {
      throw new Error('Error')
    }
    return removedSetting;
  }
}
