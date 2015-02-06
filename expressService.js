var express = require('express');
var bodyParser = require('body-parser');
var main = require('./server.js');
exports.initServer = function () {
    var server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded());
    server.use(express.static(main.path.join(__dirname, 'app')));
    server.get('/product', function (req, res) {
        res.send('GET called without parameter...');
    });

    server.get('/', main.app.index);
    server.get('/product/:id', function (req, res) {
        res.send('GET called with ' + req.param('id') + '...');
    });

    server.post('/product', function (req, res) {
        res.send('POST called with json ' + typeof req.body + '...');
    });
    server.listen(main.port, success).on('error', failure);
    return server;
};
success = function () {
    console.log('Server running on port ' + main.port + '...');
};


failure = function (e) {
    if (e.code == 'EADDRINUSE') {
        console.log('Address in use : ');
    }
    console.log('Failed to start server...');
};
