const gql = require("graphql-tag");

module.exports = gql`
    scalar JSON

    type Usuario {
        id: ID!
        nombre: String!
        mensajes: [Mensaje]
    }

    type Mensaje {
        id: ID!
        mensaje: String!
        de: Usuario
        para: Usuario
    }

    type Query {
        _: Boolean
        info: JSON
        misDatos(nombre: String): Usuario
        usuarios: [Usuario]
    }

    input EnviarMensageInput {
        mensaje: String!
        de: ID!
        para: ID!
    }

    type Mutation {
        enviarMensaje(input: EnviarMensageInput!): JSON
    }

    extend type Mutation {
        crearUsuario(nombre: String!): JSON
    }

    type Subscription {
        nuevoMensaje(usuario_id: ID!): Mensaje
    }
`;
