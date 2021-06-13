const { join } = require('path');
const { readFileSync } = require('fs');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers');
const typeDefsPath = join(__dirname, 'typeDefs.graphql');
const typeDefs = readFileSync(typeDefsPath, 'utf-8');
const context = require('./context');

const { config } = require('../config');

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    onConnect: (params, ws, context) => {
      console.log('Connected to WS');
      const newContext = { ...context, ...params };
      return newContext;
    },
  },
  //playground: config.dev ? true : false,
  playground: true,
  introspection: true,
  context,
});
