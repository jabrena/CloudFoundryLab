/*jslint node: true*/
"use strict";

var fs = require('fs');
var http2 = require('http2');

var options = {
    key: fs.readFileSync('./certificate/privkey.pem'),
    cert: fs.readFileSync('./certificate/cert.pem')
};
var port = process.env.VCAP_APP_PORT || 8080;
http2.createServer(options, function (request, response) {
    response.end('Hello world!');
}).listen(port);
