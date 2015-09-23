/*jslint node: true*/
"use strict";

var fs = require('fs');
var http2 = require('http2');
var express = require('express');

var app = express();
app.get('/', function (req, res) {
    console.log(req.headers);

    res.header('Content-type', 'text/html');
    return res.end('<h1>Hello, Secure World!</h1>');
});

var options = {
    key: fs.readFileSync('./certificate/localhost.key'),
    cert: fs.readFileSync('./certificate/localhost.crt')
};
var port = process.env.VCAP_APP_PORT || 8080;
http2.createServer(options, app).listen(port);
