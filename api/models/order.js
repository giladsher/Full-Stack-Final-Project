const mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Defining a new mongoDB Schema for products
let Order = new Schema({
    cart: Array,
    userID: String
}, {collection: 'Order'});
module.exports = mongoose.model('Order', Order);