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



`;

// export the typeDefs
module.exports = typeDefs;