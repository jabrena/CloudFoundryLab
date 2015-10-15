/*jslint node: true*/
"use strict";

var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });
app.use(bodyParser.json());

//REST

//Method designed to upload a file
app.post('/upload/', upload.single('file'), function (req, res) {
    console.log(req.headers);
    console.log(req.file.filename);
    return res.end();
});

//Method designed to list files from a folder
app.get('/media/', function (req, res) {

    var files = fs.readdirSync('./public/uploads/');
    var html = "<!doctype html><html><head><title>List of media files<title></title></head><body>";
    for (var i in files) {
        html += "<a href=\"/uploads/" + files[i] + "\" target=\"_blank\">" + files[i] + "</a><br />";
        //console.log(files[i]);
    }

    html += "</body></html>";
    return res.end(html);
});

//Templating
app.use(express.static(__dirname + '/public'));

//Server
var localPort = process.env.VCAP_APP_PORT || 3000;
http.listen(localPort, function () {
    console.log('Listening on *:' + localPort);
});