mongoose = require('mongoose');
var server = 'localhost';
var DBName = 'mustached-octo';
var success, failure, content, user, callback, returnValue;
var data = require('./model/data.js');
var users = require('./model/users.js');
exports.connect = function() {
    mongoose.connect('mongodb://' + server + '/' + DBName, function(e) {if(!e) success(); else failure(e);});
    data.initModel();
    users.initModel();
}


success = function () {
    console.log('Mongoose connected to ' + DBName + ' db on ' + server + '...');
};

failure = function (e) {
    console.log('Failed to connect Mongoose...');
};
exports.connect();