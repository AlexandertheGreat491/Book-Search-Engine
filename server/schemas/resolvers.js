// imports the apollo-server-express library
const {AuthenticationError} = require('apollo-server-express');
// imports the models
const {User, Book} = require('../models');
// imports the sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {

};

module.exports = resolvers;