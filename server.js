const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const ejsMate = require('ejs-mate');

const User = require('./models/user');

const app = express();

mongoose.connect('mongodb://root:12345@ds227035.mlab.com:27035/ecommerce',function(err){
    if(err) {
        console.log(err);
    }
    else {
        console.log("connected to the database");
    }
});

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.engine('ejs',ejsMate);
app.set('view engine','ejs');

app.post('/create-user',function(req,res,next){
    var user = new User();
    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save(function(err){
        if(err) return next(err);
        res.json("Successfully added a new user");
    });
});

app.get('/',function(req,res){
    res.render("home");
});

app.get('/about',function(req,res){
    res.render("about");
});

app.listen(4000,function(err){
    if(err) throw err;
    console.log("Server Running at PORT : 4000");
});