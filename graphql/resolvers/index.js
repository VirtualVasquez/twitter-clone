const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
// const { Subscription } = require('./posts'); not being used



//collection of functions that generate response for a GraphQL query
module.exports = {
    Post:{
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    // Subscription: {
    //     ...postsResolvers.Subscription
    // }
}