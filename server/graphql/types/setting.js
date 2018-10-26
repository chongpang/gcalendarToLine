

var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;

exports.SettingType = new GraphQLObjectType({
  name: 'setting',
  description: 'setting Type',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      lineChannelSecret:{
        type: GraphQLString
      },
      lineChannelToken: {
        type: GraphQLString
      },
      lineUserId:{
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      schPostTime: {
        type: GraphQLString
      },
      schStart: {
        type: GraphQLString
      },
      schEnd: {
        type: GraphQLString
      },
      autoPost: {
        type: GraphQLBoolean
      },
      updatedAt: {
        type: GraphQLString
      },
      updatedBy: {
        type: GraphQLString
      },
      createdAt: {
        type: GraphQLString
      },
      createdBy: {
        type: GraphQLString
      }
    }
  }
});