/*jslint node: true*/
/*globals Promise:true*/
"use strict";

var MySQLHelper = require("../helpers/MySQLHelper");

function Service1() {
    this.MySQLHelper = new MySQLHelper();
}

Service1.prototype.init = function () {

    var self = this;

    return new Promise(function (resolve, reject) {

        try {

            console.log(process.env.VCAP_SERVICES);

            self.MySQLHelper.init().then(function (result) {
                console.log("result", result);
                return resolve(result);
            }).catch(function (err) {
                return resolve(err);
            });

        } catch (e) {
            return reject(e);
        }

    });

};

Service1.prototype.query = function () {

    var QUERY = "SELECT * FROM demo;"

    var self = this;

    return new Promise(function (resolve, reject) {

        try {

            self.MySQLHelper.query(QUERY).then(function (result) {
                console.log("result", result);
                return resolve(result);
            }).catch(function (err) {
                return reject(err);
            });

        } catch (e) {
            return reject(e);
        }

    });

};

Service1.prototype.close = function () {

    var self = this;

    return new Promise(function (resolve, reject) {

        try {

            self.MySQLHelper.close().then(function (result) {
                console.log("result", result);
                return resolve(result);
            }).catch(function (err) {
                return reject(err);
            });

        } catch (e) {
            return reject(e);
        }

    });

};

module.exports = Service1;