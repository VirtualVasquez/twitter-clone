# Twitter Clone

A comprehensive look at the foundations of a MERNG application. See the application in action [here](https://calm-eyrie-20998.herokuapp.com/)

### The app on the landing page when signed out. 

![landing page](/readme_assets/landing.png)

## Things You Can Do On the Site

    - Create a new user
    - Login and Logout of an account.
    - Create posts.
    - Like and comment on posts and comments
    - Delete your posts and comments.

## How It Works

Given the complexity of social media app, Apollo GraphQL is the query language being utilized for all the API queries and mutations. This makes it signifcantly easier to request and update information from our Mongo database, ranging all the way from register a new user to the site, to fetching all the likes that a given comment has received. 

Helping forward the ease of use is React. Components can be summoned wherever they are needed, without needing to rewrite redunant code. Combined with React hooks and reducers, it's much easier to provide context to the components, without having to pass down state a series of components. Thus, when a mutaiton or query is utilized, the application knows what to do or look for. 

A great example of this is with the delete button. Though it remains visually the same on both posts and comments, they only delete the respective element they are nested in, and _only_ if the user is both logged in _and_ the respective owner of the post or comment. All of this without having to duplicate code.


### The delete button is only visible on "User's" posts...

![delete post](/readme_assets/deletePost.PNG)

### ... and "User's" comments

![delete comment](/readme_assets/deleteComment.PNG)

The backend portion of the application is hosted on Heroku, while the frontend application of the application is on Netlify. 

## Road Map

If I were to develop this app further, what I would like to do the following:
- Create a landing page that shows no comments until the user is logged in.
- Have a page that renders all of the posts and comments the user has liked, with the ability to go to the single page post upon clicking.
- Make it possible for the user to upload a custom photo.
- Setup profile pages for users. 


## Technologies Used
- MongoDB
- Express
- React
- Node.js
- GraphQL (Apollo)
- bcryptjs
- jsonwebtoken
- Semantic UI
- Heroku
- Netlify