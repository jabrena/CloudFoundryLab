'use strict';

module.exports = function (grunt) {
    var localhost = 'http://localhost:';
    var default_port = 9000;
    var development_browser = "Google Chrome";
    if(process.platform === "win32"){
        development_browser = "Chrome";
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Run a web server
        connect: {
            website: {
                port: default_port,
                base: '.'
            }          
        },
        //Open a Web Browser
        open : {
            website : {
                path: localhost + default_port,
                app: development_browser
            }            
        }     
    });

    //Dependencies
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-connect');

    //Task definition
    grunt.registerTask('default', 'website');
    grunt.registerTask('website', ['open:website', 'connect:website']);
};