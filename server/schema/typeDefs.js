//extract gql from apollo-server which allows us to write the pure graphql code and its automatically
//translates the code into something that javascript understands

// User cannot be null and the list cannot be null
// in Query users : [User!]! it will not directly return the users list fo rthis we need to define the function in resolvers

const { gql } = require("apollo-server");

// here moviesList in user is not present inside the user it is another array of object so we write a function inside the User in resolver

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favouriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = INDIA
  }

  input Updateusername {
    id: ID!
    newUsername: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUsername(input: Updateusername!): User
    deleteUser(id: ID!): User
  }
`;

module.exports = { typeDefs };
