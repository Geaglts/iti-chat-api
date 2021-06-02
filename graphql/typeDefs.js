const gql = require('graphql-tag');

module.exports = gql`
  scalar JSON

  type User {
    id: ID!
    name: String!
    messages: [Message]
  }

  type Message {
    id: ID!
    message: String!
    from: User
    to: User
  }

  input EnviarMensageInput {
    message: String!
    from: ID!
    to: ID!
  }

  type Query {
    _: Boolean
    info: JSON
    misDatos(id: ID!): User
    usuarios: [User]
  }

  type Mutation {
    enviarMensaje(input: EnviarMensageInput!): JSON
  }

  extend type Mutation {
    crearUsuario(nombre: String!): User
  }

  type Subscription {
    nuevoMensaje(usuario_id: ID!): Message
  }
`;
