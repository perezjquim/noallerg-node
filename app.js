const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const app = express();
const router = require('./router');
const basicAuth = require('express-basic-auth');
const db = require('./database/database');

db.init();

app.use(basicAuth({
    users: db.getUsers(),
    challenge: true // <--- needed to actually show the login dialog!
}));  
app.use(compress());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);
app.use(function(req, res, next) 
{
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var html = '<!DOCTYPE html>';
    html+= '<html>';
    html+= '  <head>';
    html+= '    <title></title>';
    html+= '  </head>';
    html+= '  <body>';
    html+= '    <h1>'+err.message+'</h1>';
    html+= '    <h2>'+err.status+'</h2>';
    html+= '    <pre>'+err.stack+'</pre>';
    html+= '  </body>';
    html+= '</html>';
    res.send(html);
}); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

module.exports = app;