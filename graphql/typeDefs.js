const gql = require('graphql-tag');

module.exports = gql`
  scalar JSON

  type Contact {
    id: ID!
    alias: String!
    user: User
  }

  type User {
    id: ID!
    name: String!
    phone: String!
    contacts: [Contact]
    messages: [Message]
  }

  input ContactInput {
    alias: String!
    phone: String!
  }

  input NewUserInput {
    name: String!
    phone: String!
    contacts: [ContactInput]
  }

  type Message {
    id: ID!
    message: String!
    time: String!
    from: User
    to: User
  }

  input EnviarMensageInput {
    message: String!
    from: ID!
    to: ID!
  }

  input UpdateContactsInput {
    userId: ID!
    contacts: [ContactInput]
  }

  type Query {
    _: Boolean
    info: JSON
    misDatos(id: ID!): User
    usuarios: [User]
  }

  extend type Query {
    getMessages(userId: ID!, contactId: ID!): [Message]
    verificarCuenta(phone: String!): ID
  }

  type Mutation {
    enviarMensaje(input: EnviarMensageInput!): JSON
  }

  extend type Mutation {
    crearUsuario(input: NewUserInput!): User
    updateContacts(input: UpdateContactsInput!): Boolean!
  }

  type Subscription {
    nuevoMensaje(usuario_id: ID!): Message
  }
`;
