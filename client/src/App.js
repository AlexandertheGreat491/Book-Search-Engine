// imports react
import React from 'react';
// imports BrowserRouter from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// imports the SearchBooks page
import SearchBooks from './pages/SearchBooks';
// imports the SavedBooks page
import SavedBooks from './pages/SavedBooks';
// imports the NavBar component
import Navbar from './components/Navbar';
// imports ApolloProvide , ApolloClient, InMemoryCache, createHttpLink form apollo-client
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

function App() {
  return (
    <Router>
      <>
        <Navbar />
          <Routes>
            <Route 
              path='/' 
              element={<SearchBooks />} 
            />
            <Route 
              path='/saved' 
              element={<SavedBooks />} 
            />
            <Route 
              path='*'
              element={<h1 className='display-2'>Wrong page!</h1>} 
            />
          </Routes>
      </>
    </Router>
  );
}

export default App;
