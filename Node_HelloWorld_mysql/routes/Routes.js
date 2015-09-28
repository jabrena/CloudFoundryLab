/*jslint node: true*/
"use strict";

var bodyParser = require('body-parser');
var mysql      = require('mysql');

//var MySQLService = require("../services/MySQLService");
//MySQLService = new MySQLService();
var Service1 = require("../services/Service1");
Service1 = new Service1();

//Routes
module.exports = function (express) {

    var router = express.Router();

    router.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
    router.use(bodyParser.json());// parse application/json

/**
    //TODO: Implement a filter

    var ssl = false;
    if(req.headers['x-forwarded-proto'] === "https"){
        ssl = true;
    }
*/

    router.get('/', function (req, res) {
        res.render('welcome');
    });

    router.get("/init/", function (req, res) {

        Service1.init().then(function (result) {
            console.log("result", result);
            res.json(result);
        }).catch(function (err) {
            res.json(err);
        });

    });

    router.get("/query/", function (req, res) {

        Service1.query().then(function (result) {
            console.log("result", result);
            res.json(result);
        }).catch(function (err) {
            res.json(err);
        });

    });

    router.get("/close/", function (req, res) {

        Service1.close().then(function (result) {
            console.log("result", result);
            res.json(result);
        }).catch(function (err) {
            res.json(err);
        });

    });

    return router;
};