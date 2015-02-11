'use strict';
var server, serverService, dbService, bodyParser, users, data, encryption;
var main = function () {
    exports.app = require('./app');
    exports.path = require('path');
    exports.port = setPort(process);

    serverService = require('./expressService.js');
    bodyParser = require('body-parser');
    dbService = require('./mongoose.js');
    dbService = require('./mongoose.js');
    data = require('./model/data.js');
    users = require('./model/users.js');
    dbService = require('./model/users.js');
    encryption = require('./authentication.js');

    server = serverService.initServer();

    server.get('/data', function(req, res) {
        if(!req.query)
            data.findAll(function(data){res.send(data);});
        else
            data.query(req.query, function(data){res.send(data);})
    });
    server.post('/data',
        function(req, res) {
            console.log(req.body);
            if(req.body && req.body.name && req.body.createdOn && req.body.members && req.body.owners && req.body.lists) {
                data.insert(req.body,
                    function(data){
                        res.send(data);
                    },
                    function(data){
                        res.status(400).json(data);
                    })
            } else {
                res.status(400).json({ error: 'Incorrect Data!' });
            }
        }
    );

    server.get('/data/:id', function(req, res) {
        data.findById(req.params.id, function(data){res.send(data);});
    });
    server.post('/auth', function(req, res) {
        users.authenticate(req.body.username, req.body.password,
            function(data){
                res.send(data);
            },
            function(data){
                res.status(401).json({ error: 'Authentication Failure!' });
            }
        );
    });
};



var setPort = function (process) {
        return process.argv.length > 2 && !isNaN(process.argv[2]) ? process.argv[2] : 5555;
    };

main();
