// imports the apollo-server-express library
const {AuthenticationError} = require('apollo-server-express');
// imports the models
const {User, Book} = require('../models');
// imports the sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
Query: {
    me: async (parent, args, context) => {
        if (context.user) {
            const userData = await User.findOne({_id: context.user._id})
            .select('-_v -password')

            return userData;
        }

        throw new AuthenticationError('You are not logged in!');
    }
},
Mutation: {
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return {token, user};
    },
}
};

module.exports = resolvers;