// imports the apollo-server-express library
const { AuthenticationError } = require("apollo-server-express");
// imports the models
const { User, Book } = require("../models");
// imports the sign token function from auth
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-_v -password"
        );

        return userData;
      }

      throw new AuthenticationError("You are not logged in!");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Wrong credentials");
      }

      const rightPassword = await user.isRightPassword(password);

      if (!rightPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const savedBook = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );

        return savedBook;
      }
      throw new AuthenticationError("You need to be logged in");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const removeBook = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } }
        );

        return removeBook;
      }

      throw new AuthenticationError("You must be logged in");
    },
  },
};

module.exports = resolvers;
