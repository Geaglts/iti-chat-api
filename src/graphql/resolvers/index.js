const Query = require('./Query');
const Mutation = require('./Mutation');
const Subscription = require('./Subscription');
const Parents = require('./Parents');
const GraphQLJSON = require('graphql-type-json');

module.exports = {
  JSON: GraphQLJSON,
  Query,
  Mutation,
  Subscription,
  ...Parents,
};
