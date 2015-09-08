/*jslint node: true*/
"use strict";

var fs = require('fs'),
    https = require('https'),
    express = require('express'),
    app = express();

var port = process.env.VCAP_APP_PORT || 8000;
https.createServer({
    key: fs.readFileSync('privkey.pem'),
    cert: fs.readFileSync('cert.pem')
}, app).listen(port);
console.log('Listening on port ' + port + '...');

app.get('/', function (req, res) {
    res.header('Content-type', 'text/html');
    return res.end('<h1>Hello, Secure World!</h1>');
});
