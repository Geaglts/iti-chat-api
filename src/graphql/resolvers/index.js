const Query = require("./Query");
const Mutation = require("./Mutation");
const Usuario = require("./Usuario");
const Mensaje = require("./Mensaje");
const Subscription = require("./Subscription");
const GraphQLJSON = require("graphql-type-json");

module.exports = {
    JSON: GraphQLJSON,
    Query,
    Mutation,
    Usuario,
    Mensaje,
    Subscription,
};
