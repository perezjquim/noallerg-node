#!/usr/bin/env node

const fs = require('fs');
const app = require('./app');
const http = require('http');
const https = require('https');
const PORT_HTTP = 80;
const PORT_HTTPS = 443;
const options = 
{
  key: fs.readFileSync('certificates/server.key'),
  cert: fs.readFileSync('certificates/server.crt')
};

const server_http = http.createServer(app);
server_http.listen(PORT_HTTP,(err) =>
{
	if(!err) console.log("started listening on HTTP");
});

const server_https = https.createServer(app);
server_https.listen(PORT_HTTPS,(err) =>
{
	if(!err) console.log("started listening on HTTPS");
});