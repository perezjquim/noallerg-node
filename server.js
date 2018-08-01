#!/usr/bin/env node

const app = require('./app');
const http = require('http');
const https = require('https');

const HTTP_PORT = 80;
const HTTPS_PORT = 443;

const fs = require('fs');
const creds = 
{
	key: fs.readFileSync('certs/server-key.pem'),
  cert: fs.readFileSync('certs/server-crt.pem'), 
  ca: fs.readFileSync('certs/ca-crt.pem')
};

//app.set('port', port);

const sHttp = http.createServer(app);
const sHttps = https.createServer(creds,app);
sHttp.listen(HTTP_PORT);
sHttps.listen(HTTPS_PORT);