const { ApolloServer, PubSub } = require("apollo-server-express");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const pubsub = new PubSub();

module.exports = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: {
        onConnect: () => console.log("Conectado a WS"),
    },
    playground: true,
    introspection: true,
    context: (req, res) => ({ req, res, pubsub }),
});
