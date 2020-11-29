const postsResolvers = require('./posts');
const usersResolvers = require('./users');



//collection of functions that generate response for a GraphQL query
module.exports = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation
    }
}