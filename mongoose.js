mongoose = require('mongoose');
var server = 'localhost';
var DBName = 'mustached-octo';
var success, failure, board, user, callback, returnValue;
var board = require('./model/board.js');
var users = require('./model/users.js');
var list = require('./model/list.js');
exports.connect = function() {
    mongoose.connect('mongodb://' + server + '/' + DBName, function(e) {if(!e) success(); else failure(e);});
    board.initModel();
    users.initModel();
    list.initModel();
}


success = function () {
    console.info('Mongoose connected to ' + DBName + ' db on ' + server + '...');
};

failure = function (e) {
    console.info('Failed to connect Mongoose...');
    process.exit(0);
};
exports.connect();