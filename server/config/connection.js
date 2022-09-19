const mongoose = require('mongoose');
// connects to my database on MongoDB Atlas
let db = process.env.db || "mongodb+srv://Insomnia123:Winston1235@cluster0.c9efx.mongodb.net/book-search?retryWrites=true&w=majority"
mongoose.connect(db)
    .then(_ => console.log("Connected to database."));
// exports the connection logic so that it can be utilized by the application
module.exports = mongoose.connection;
// used code from https://stackoverflow.com/questions/68896073/unable-to-connect-to-mongodb-database-in-heroku-even-when-pasting-db-connection