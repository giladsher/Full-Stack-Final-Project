// CRUD code is in this file
const express = require('express'),
app = express(),
productRoute = express.Router();

// add the product model
let Product = require('../models/product');
let db;

// Get products
productRoute.route('/get').get((req, res) => {
    Product.find((err, products) => {
        if (err) res.json(err);
        else res.status(200).json(products);
    });
});
productRoute.route('/:id').get((req, res) => {
    Product.findById(req.params.id, (err, response) => {
        if (err) res.status(400).json(err);
        else res.status(200).json(response);
    })
})
productRoute.route('/add-product').post((req, res) => {
    let product = new Product(req.body);
    product.save().then((product) => {
        res.status(200).json({product: product});
    }).catch((err) => {
        res.status(400).json({err: err});
    });
});
productRoute.route('/delete-product/:id').get((req, response) => {
    Product.findByIdAndDelete(req.params.id, (err, res) => {
        if (err) response.status(400).json(err);
        else response.status(200).json(res);
    });
});


module.exports = productRoute;