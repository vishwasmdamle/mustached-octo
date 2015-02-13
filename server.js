'use strict';
var server, serverService, dbService, bodyParser, users, board, list, encryption;
var main = function () {
    exports.app = require('./app');
    exports.path = require('path');
    exports.port = setPort(process);

    serverService = require('./expressService.js');
    bodyParser = require('body-parser');
    dbService = require('./mongoose.js');
    dbService = require('./mongoose.js');
    board = require('./model/board.js');
    list = require('./model/list.js');
    users = require('./model/users.js');
    dbService = require('./model/users.js');
    encryption = require('./authentication.js');

    server = serverService.initServer();

    server.get('/board', function(req, res) {
        if(!req.query)
            board.findAll(function(data){res.status(200).json(data);});
        else
            board.query(req.query, function(data){res.status(200).json(data);})
    });

    server.post('/board', function(req, res) {
            console.log(req.body);
            if(req.body && req.body.name && req.body.createdOn && req.body.members && req.body.owners && req.body.lists) {
                var insertOrUpdate = req.body._id ? 'update' : 'insert';
                board[insertOrUpdate](req.body,
                    function(data){
                        res.status(200).json(data);
                    },
                    function(data){
                        res.status(400).json(data);
                    })
            } else {
                res.status(400).json({ error: 'Incorrect Data!' });
            }
        });

    server.get('/board/:id', function(req, res) {
        board.findById(req.params.id, function(data){res.status(200).json(data);});
    });

    server.get('/list', function(req, res) {
        if(req.query.boardId) {
            board.findById(req.query.boardId, function(data) {
                if(data == null) {
                    res.status(200).json([]);
                } else {
                    console.log(data.lists);
                    list.findByIds(data.lists, function(data){res.status(200).json(data);});
                }
            });
        } else {
            res.status(400).json({ error: 'Missing board id parameter!' });
        }
    });

    server.post('/list', function(req, res) {
            console.log(req.body);
            if(req.body && req.body.name) {
            var insertOrUpdate = req.body._id ? 'update' : 'insert';
                list[insertOrUpdate](req.body,
                    function(data){
                        res.status(200).json(data);
                    },
                    function(data){
                        res.status(400).json(data);
                    })
            } else {
                res.status(400).json({ error: 'Incorrect Data!' });
            }
        });

    server.post('/auth', function(req, res) {
        users.authenticate(req.body.username, req.body.password,
            function(data){
                res.status(200).json(data);
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
