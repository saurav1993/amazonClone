const express = require('express');
const morgan = require("morgan");

const app = express();

//Middleware
app.use(morgan('dev'));

//Home Route
app.get("/",(req,res)=>{
    res.send("Hi");
})

app.listen(4000,function(err){
    if(err) throw err;
    console.log("Server Running at PORT : 4000");
});