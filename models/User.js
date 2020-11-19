//database user models to use for interface.
//MongoDB is schema-less, but we can use them
const { model, Schema } = require('mongoose');

const userSchema = new Schema ({
    username: String,
    password: String,
    email: String,
    createdAt: String
});

module.exports = model('User', userSchema);