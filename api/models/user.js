const mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Defining a new mongoDB Schema for products
let User = new Schema({
    email: String,
    username: String,
    password: String,
    admin: Boolean
}, {collection: 'Users'});
module.exports = mongoose.model('User', User);