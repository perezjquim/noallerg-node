#!/usr/bin/env node

const app = require('./app');
const http = require('http');
const port = 80;

app.set('port', port);

const server = http.createServer(app);
server.listen(port,(err) =>
{
	if(!err) console.log("started listening");
});
server.on('error', (e) => console.log(e));
server.on('listening', () => console.log("listening"));