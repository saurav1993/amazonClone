const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const flash = require("express-flash");

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
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(session({
    resave : true,
    saveUninitialized : true,
    secret : "munu1993"
}));
app.use(flash());

app.engine('ejs',ejsMate);
app.set('view engine','ejs');

const mainRoutes = require('./routes/main');
const userRoutes = require("./routes/user");
app.use(mainRoutes);
app.use(userRoutes);

app.listen(4000,function(err){
    if(err) throw err;
    console.log("Server Running at PORT : 4000");
});