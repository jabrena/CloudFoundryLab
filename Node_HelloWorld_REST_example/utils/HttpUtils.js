/*jslint node: true*/
/*globals Promise:true*/
"use strict";

var Promise = require('bluebird');
var request = require('request');

/**
 * HttpUtils is a private class designed manage REST operations with 
 * Cloud Foundry components (Cloud controller, UAA, Metrics).
 * It is used by all classes of project.
 * @constructor
 */
function HttpUtils() {
    return undefined;
}

/**
 * Stablish a http communications using REST Verbs: GET/POST/PUT/DELETE
 *
 * @param  {json} options          [define options to make the request with the CF component]
 * @param  {number} httpStatusAssert [set expected http status code (200,201,204, etc...)]
 * @param  {boolan} jsonOutput       [if the REST method retuns a String or a JSON representation]
 * @return {string}                  [JSON/String]
 *
 * @example
 * var url = "https://api.run.pivotal.io/v2/info";
 *       var options = {
 *           method: 'GET',
 *           url: url
 *       };
 * HttpUtils.request(options, "200", true);
 */
HttpUtils.prototype.request = function (options, httpStatusAssert, jsonOutput) {

    var result = null;

    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var requestWithDefaults = request.defaults({
        //rejectUnauthorized: false
    });

    return new Promise(function (resolve, reject) {

        try {

            requestWithDefaults(options, function (error, response, body) {
                if (error) {
                    return reject(error);
                }

                if (jsonOutput) {
                    result = JSON.parse(body);
                } else {
                    result = body;
                }

                if (!error && response.statusCode == httpStatusAssert) {
                    return resolve(result);
                } else {
                    return reject(body);
                }
            });

        } catch (error) {
            return reject(error);
        }

    });

};

module.exports = HttpUtils;
