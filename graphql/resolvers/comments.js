const {AuthenticationError, UserInputError} = require('apollo-server');

const checkAuth = require('../../util/check-auth');
const Post = require('../../models/Post');

module.exports = {
    Mutation: {
        createComment: async (_, {postId, body},context) =>{
            const { username } = checkAuth(context);
            if(body.trim() === ''){
                throw new UserInputError('Empty comment', {
                    errors:{
                        body: 'Comment body must not be empty'
                    }
                })
            }

            const post = await Post.findById(postId);
            
            if(post){
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                return post

            } else throw new UserInputError('Post not found')
        },

        async deleteComment(_, {postId, commentId}, context){
            const {username } = checkAuth(context);

            const post = await Post.findById(postId);
            //if post exists
            if(post){
                //get index of comment in array
                const commentIndex = post.comments.findIndex(c => c.id === commentId);
                //if owner of post
                if(post.comments[commentIndex].username === username){
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post
                }else {
                    throw new AuthenticationError('Action not allowed')
                }
            } else {
                throw new UserInputError('Post not found');
            }
        }
    }
}