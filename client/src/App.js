// imports react
import React from "react";
// imports the App css
import "./App.css";
// imports BrowserRouter from react-router-dom
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// imports the SearchBooks page
import SearchBooks from "./pages/SearchBooks";
// imports the SavedBooks page
import SavedBooks from "./pages/SavedBooks";
// imports the NavBar component
import Navbar from "./components/Navbar";
// imports ApolloProvider , ApolloClient, InMemoryCache, createHttpLink form apollo-client
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
//imports setContext
import { setContext } from "@apollo/client/link/context";

// links to the Apollo server
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchBooks} />
            <Route path="/saved" component={SavedBooks} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

// exports the root of the application
export default App;
