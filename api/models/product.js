const mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Defining a new mongoDB Schema for products
let Product = new Schema({
    picture: String,
    description: String,
    cost: Number
}, {collection: 'Products'});
module.exports = mongoose.model('Product', Product);