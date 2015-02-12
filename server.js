'use strict';
var server, serverService, dbService, bodyParser, users, board, encryption;
var main = function () {
    exports.app = require('./app');
    exports.path = require('path');
    exports.port = setPort(process);

    serverService = require('./expressService.js');
    bodyParser = require('body-parser');
    dbService = require('./mongoose.js');
    dbService = require('./mongoose.js');
    board = require('./model/board.js');
    users = require('./model/users.js');
    dbService = require('./model/users.js');
    encryption = require('./authentication.js');

    server = serverService.initServer();

    server.get('/board', function(req, res) {
        if(!req.query)
            board.findAll(function(data){res.send(data);});
        else
            board.query(req.query, function(data){res.send(data);})
    });
    server.post('/board',
        function(req, res) {
            console.log(req.body);
            if(req.body && req.body.name && req.body.createdOn && req.body.members && req.body.owners && req.body.lists) {
                board.insert(req.body,
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

    server.get('/board/:id', function(req, res) {
        board.findById(req.params.id, function(data){res.send(data);});
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
