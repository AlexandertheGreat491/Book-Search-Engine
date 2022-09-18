// imports react
import React from 'react';
// imports Jumbotron, Container, Col, Form, Button, Card, & CardColumns from react-bootstrap
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
// imports useQuery and useMutation from apollo/client
import { useQuery, useMutation } from '@apollo/client';
// imports the GET_ME query
import { GET_ME } from '../utils/queries';
// imports the REMOVE_BOOK mutation
import { REMOVE_BOOK } from '../utils/mutations';
// imports the auth logic
import Auth from '../utils/auth';
// imports the functionality & logic from localStorage
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);
  const userData = data?.me || {};

  // function accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeBook({variables: { bookId }});
      // when successful, the book's id is removed from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

 
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks?.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

// exports SavedBooks to the root of the application
export default SavedBooks;