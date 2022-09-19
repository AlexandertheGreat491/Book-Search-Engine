const mongoose = require('mongoose');
// connects to my database on MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/book-search', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// exports the connection logic so that it can be utilized by the application
module.exports = mongoose.connection;
