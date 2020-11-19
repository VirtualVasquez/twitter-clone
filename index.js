const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const { MONGODB } = require('./config.js');


const typeDefs = gql`
        type Post{
            id: ID!
            body: String!
            createdAt: String!
            username: String!
        }

    type Query{
        getPosts:[Post]
    } 
`
//colletion of functions that generate response for a GraphQL query
        //async prevents servers from stopping if the query fails
                //arguments left blank in ```find()``` to find ALL posts
const resolvers = {
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

const server = new ApolloServer({
    typeDefs,
    resolvers
})

//connect to database BEFORE starting server
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({port: 5000});
    })
    .then((res) =>{
        console.log(`Server Running at ${res.url}`)
    })


    