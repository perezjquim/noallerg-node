#!/usr/bin/env node

const app = require('./app');
const http = require('http');
const https = require('https');

const HTTP_PORT = 80;
const HTTPS_PORT = 443;

const fs = require('fs');
const privateKey  = fs.readFileSync('privateKey.key', 'utf8');
const certificate = fs.readFileSync('certificate.crt', 'utf8');
const creds = {key: privateKey, cert: certificate};

//app.set('port', port);

const sHttp = http.createServer(app);
const sHttps = https.createServer(creds,app);
sHttp.listen(HTTP_PORT);
sHttps.listen(HTTPS_PORT);