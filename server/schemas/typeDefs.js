// imports the gql tagged template function
const { gql } = require('apollo-server-express');

// creates the typeDefs
const typeDefs = gql`
type Query {
    me: User
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBook: [Book]
}

type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: saveBookInput): User
    removeBook(bookId: ID!): User
}

`;

// export the typeDefs
module.exports = typeDefs;