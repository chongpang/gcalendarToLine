

var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;

exports.MessageType = new GraphQLObjectType({
  name: 'message',
  description: 'Message Type',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      calStart: {
        type: GraphQLString
      },
      calEnd: {
        type: GraphQLString
      },
      image: {
        type: GraphQLString
      },
      calMsg: {
        type: GraphQLString
      },
      preMsg: {
        type: GraphQLString
      },
      createdBy: {
        type: GraphQLString
      },
      createdAt: {
        type: GraphQLString
      }
    }
  }
});
