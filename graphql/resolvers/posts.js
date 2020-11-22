const Post = require('../../models/Post');

        //async prevents servers from stopping if the query fails
                //arguments left blank in ```find()``` to find ALL posts
module.exports = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find();
                return posts;
            } catch (err){
                throw new Error(err);
            }
        }
    }
}