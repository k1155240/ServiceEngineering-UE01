var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require('express-session')

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'thatsfunny' }));

app.get("/",function(req,res,next){
  //res.sendFile(path.resolve(__dirname + '/../app//index.html'));
  res.send("Hello world " + __dirname);
}); 
app.get("/index.html",function(req,res,next){
    console.log(req.user);
  //res.sendFile(path.resolve(__dirname + '/../app//index.html'));
  res.send("Hello world " + __dirname);
}); 

app.listen(process.env.PORT,function(){
    console.log("Started listening on port", process.env.PORT);
});
