var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require('express-session')

var Mongo = require('/build/server/mongo.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'thatsfunny' }));

app.get("/projects/*", ensureAuthenticated, function(req,res,next){
  res.sendFile(path.resolve(__dirname + '/../app//index.html'));
}); 
app.get("/tasks/*", ensureAuthenticated, function(req,res,next){
  res.sendFile(path.resolve(__dirname + '/../app//index.html'));
});
app.get("/problems/*", ensureAuthenticated, function(req,res,next){
  res.sendFile(path.resolve(__dirname + '/../app//index.html'));
});
app.get("/login/*",function(req,res,next){
  res.sendFile(path.resolve(__dirname + '/../app//index.html'));
}); 

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

function ensureAuthenticatedAPI(req, res, next) {
  //if (req.isAuthenticated()) { return next(); }
   return next();
    //res.json({authenticated: false});
}

function ensureAuthenticated(req, res, next) {
  //if (req.isAuthenticated()) { return next(); }
  return next();
    //res.redirect('/login/')
}
