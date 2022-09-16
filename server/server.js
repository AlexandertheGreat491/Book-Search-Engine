// imports the express library
const express = require('express');
// imports the ApolloServer
const {ApolloServer} = require('apollo-server-express');
const path = require('path');
// imports the connetion.js & files in schemas directory
const db = require('./config/connection');
const routes = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if the app is in production, client/build will be served as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

