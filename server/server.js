// imports the express library
const express = require('express');
// imports the ApolloServer
const {ApolloServer} = require('apollo-server-express');
const path = require('path');
// imports the typeDefs & resolvers
const {typeDefs, resolvers} = require('./schemas');
// imports the middleware from the auth logic
const {authMiddleware} = require('./utils/auth');
// imports the connetion.js & files in schemas directory
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// an Apollo server that passes in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if the app is in production, client/build will be served as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// creates a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  // integrates the Apollo server with the Express application as middleware
  server.applyMiddleware({app});

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at https://localhost:${PORT}${server.graphqlPath}`);
    })
  })
}

// starts the server
startApolloServer(typeDefs, resolvers);




