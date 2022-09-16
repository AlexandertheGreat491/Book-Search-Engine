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
    bookCount: 
}

type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}


`;

// export the typeDefs
module.exports = typeDefs;