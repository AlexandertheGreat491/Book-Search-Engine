// imports gql from apollo/client
import { gql } from "@apollo/client";

// exports the GET_ME query
export const GET_ME = gql`
{
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;