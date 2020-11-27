const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const{ UserInputError} = require('apollo-server');

const {validateRegisterInput, validateLoginInput} = require('../../util/validators')

const { SECRET_KEY } = require('../../config')
const User = require('../../models/User');

function generateToken(user){
    return jwt.sign({
        id: user.id, 
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h'}); 
}

module.exports = {
    Mutation: {
        async login(_, {username, password}){
            const {errors, valid} = validateLoginInput(username, password);
            const user = await User.findOne({username});

            //if valid is false
            if(!valid){
                throw new UserInputError('Errors', {errors})
            }
            //if user not registered
            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('Wrong credentials', {errors})
            }
            //if password is incorrect
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', {errors})
            }

            const token = generateToken(user)

            return{
                ...user._doc,
                id: user._id,
                token
            }
        },
        
        
        
        //four options in the resolver arguments
            //parent - result of last step (no last step here)
            //args - user sent data (destructured here for ease)
            //context - not being used, so not included
            //info - not being used, so not included
            //general - metadata. Not being used

        async register(
            _, 
            {
                registerInput: {username, email, password, confirmPassword} 
            }
            ){
            //TODO: Validate user data================
            const { valid, errors } = validateRegisterInput(
                username, 
                email, 
                password, 
                confirmPassword
            );
            if(!valid){
                throw new UserInputError('Errors', { errors});
            }
            //========================================

            //TODO: Make sure user doesn't already exist=====            
            const user = await User.findOne({username});
            if(user){
                throw new UserInputError('Username is taken', {
                    errors:{
                        username: 'This username is taken'
                    }
                })
            }
            //========================================
            
            //TODO: has password and create an auth token======
            //this will take the password and has it 12 times
            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });
            //save to the DB
            const res = await newUser.save();

            //create token for the user
                //jwt.sign() takes data to put inside the token
                //```SECRET_KEY``` encodes our token, allowing only our server to decode it
            const token = generateToken(res)
            return{
                ...res._doc,
                id: res._id,
                token
            }
            //==========================================

        }
    }
}