var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;

var userQueryType = require('./queries/user').queryUserType;
var userMutation = require('./mutations/user/index');

var queryAllMessageTypes = require('./queries/message').queryAllMessageTypes;
var MessageMutation = require('./mutations/message/index');

var querySettingTypes = require('./queries/setting').querySettingTypes;
var SettingMutation = require('./mutations/setting/index');

var queryAllPreMessageTypes = require('./queries/preMessage').queryAllPreMessageTypes;
var preMessageMutation = require('./mutations/preMessage/index');

var userSchema = new GraphQLSchema({
  query: userQueryType,
  mutation: new GraphQLObjectType({
    name: 'UserMutation',
    fields: userMutation
  })
});

var settingSchema = new GraphQLSchema({
  query: querySettingTypes,
  mutation: new GraphQLObjectType({
    name: 'SettingMutation',
    fields: SettingMutation
  })
});

var messageSchema = new GraphQLSchema({
  query: queryAllMessageTypes,
  mutation: new GraphQLObjectType({
    name: 'MessageMutation',
    fields: MessageMutation
  })
});

var preMessageSchema = new GraphQLSchema({
  query: queryAllPreMessageTypes,
  mutation: new GraphQLObjectType({
    name: 'preMessageMutation',
    fields: preMessageMutation
  })
});

module.exports = {
	userSchema,
  settingSchema,
  messageSchema,
  preMessageSchema
}

