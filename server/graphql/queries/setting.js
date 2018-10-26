
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var SettingModel = require('../../models/setting');
var SettingType = require('../types/setting').SettingType;
var GraphQLString = require('graphql').GraphQLString;

// Query
exports.querySettingTypes = new GraphQLObjectType({
  name: 'querySettingType',
  fields: function () {
    return {
      settings: {
        type: new GraphQLList(SettingType),
        resolve: function () {
          const settings = SettingModel.find().exec()
          if (!settings) {
            throw new Error('Error')
          }
          return settings
        }
      },
      setting: {
        type: SettingType,
        args: {
          _id: {
            type: GraphQLString
          },
          email:{
            type: GraphQLString
          }
        },
        resolve: function (parent, param) {
          console.log(param);
          const setting = SettingModel.findOne(param).exec()
          if (!setting) {
            throw new Error('Error')
          }
          return setting
        }
      }
    }
  }
});

