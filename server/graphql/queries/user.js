
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var UserModel = require('../../models/user');
var UserType = require('../types/user').UserType;

// Query
exports.queryUserType = new GraphQLObjectType({
  name: 'QueryUser',
  fields: function () {
    return {
      users: {
        type: new GraphQLList(UserType),
        resolve: function () {
          const users = UserModel.find().exec()
          if (!users) {
            throw new Error('Error')
          }
          return users
        }
      }
    }
  }
});

