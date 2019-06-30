const express = require('express'),
    app = express(),
    userRoute = express.Router(),
    jwt = require('jsonwebtoken');

let User = require('../models/user');


userRoute.route("/sign-up").post((req, res) => {
    User.find({'email': `${req.body.email}`}, (err, response) => {
        if(err) res.status(400).json("Could not connect to DB");
        else if(response.length > 0) res.status(400).json("Oops, looks like this email is already registered");
        else {
            if(req.body.email == 'triplesher6@gmail.com') {
                let newUser = new User({email : req.body.email, username : req.body.username, password : req.body.password, admin : true});
                newUser.save().then(user => res.status(200).json(user)).catch(err => console.log(err));
            }
            else {
                let newUser = new User({email : req.body.email, username : req.body.username, password : req.body.password, admin : false});
                newUser.save().then(user => res.status(200).json(user)).catch(err => console.log(err));
            }
            
        }
    });
}),
userRoute.route("/log-in").post((req, res) => {
    let jwtSecret = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 5; i++ ) {
        jwtSecret += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    User.find({'email' : `${req.body.email}`, 'password' : `${req.body.password}`}, (err, response) => {
        if(err) res.status(400).json("Could not connect to DB");
        else if(response.length > 0) {
            const jwtResponse = jwt.sign({payload : response[0]}, jwtSecret);
            res.status(200).json({token : jwtResponse, username : response[0].username, admin : response[0].admin});
        }
        else {
            res.status(400).json("Email or password are incorrect");
        }
    });
}),
module.exports = userRoute;