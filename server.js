'use strict';
var main = function () {
    var server, serverService, dbService, bodyParser, data;
    exports.app = require('./app');
    exports.path = require('path');
    exports.port = setPort(process);

    serverService = require('./expressService.js');
    bodyParser = require('body-parser');
    dbService = require('./mongoose.js');
    data = require('./model/data.js');
    dbService = require('./model/users.js');

    server = serverService.initServer();

    server.get('/data', function(req, res) {
        if(!req.query)
            data.findAll(function(data){res.send(data);});
        else
            data.query(req.query, function(data){res.send(data);})
    });

    server.get('/data/:id', function(req, res) {
        data.findById(req.params.id, function(data){res.send(data);});
    });
};



var setPort = function (process) {
        return process.argv.length > 2 && !isNaN(process.argv[2]) ? process.argv[2] : 5555;
    };

main();
