

var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;

exports.PreMessageType = new GraphQLObjectType({
  name: 'preMessage',
  description: 'PreMessage Type',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      datetime: {
        type: GraphQLString
      },
      message: {
        type: GraphQLString
      },
      createdBy: {
        type: GraphQLString
      },
      createdAt: {
        type: GraphQLString
      },
      updatedBy: {
        type: GraphQLString
      },
      updatedAt: {
        type: GraphQLString
      }
    }
  }
});
