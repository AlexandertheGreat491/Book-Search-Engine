const mongoose = require('mongoose');
// connects to my database on MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Insomnia123:Winston1235@cluster0.c9efx.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
// exports the connection logic so that it can be utilized by the application
module.exports = mongoose.connection;
