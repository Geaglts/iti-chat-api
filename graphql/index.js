const { ApolloServer, PubSub } = require('apollo-server-express');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const { config } = require('../config');

const pubsub = new PubSub();

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: () => console.log('Connected to WS'),
  },
  playground: config.dev ? true : false,
  introspection: true,
  context: (req, res) => ({ req, res, pubsub }),
});
