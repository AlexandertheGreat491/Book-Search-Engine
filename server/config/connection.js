const mongoose = require('mongoose');
// connects to my database on MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/book-search-engine', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
// exports the connection logic so that it can be utilized by the application
module.exports = mongoose.connection;
