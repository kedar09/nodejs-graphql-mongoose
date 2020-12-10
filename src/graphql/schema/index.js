const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    _id: ID!
    name: String!
    address: String!
  }


  input UserCreate {
    name: String!
    address: String!
  }

  input UserUpdate {
    _id: ID!
    name: String!
    address: String!
  }

  type Query {
    users:[User!]
    user(_id: ID!): User
  }

  type Mutation {
    createUser(user: UserCreate): User
    updateUser(user:UserUpdate): User
    deleteUser(_id: ID!): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);
