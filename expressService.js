var express = require('express');
var bodyParser = require('body-parser');
var main = require('./server.js');
exports.initServer = function () {
    var server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded());
    server.use(express.static(main.path.join(__dirname, 'app')));

    server.get('/', main.app.index);

    server.listen(main.port, success).on('error', failure);
    return server;
};
success = function () {
    console.info('Server running on port ' + main.port + '...');
};


failure = function (e) {
    if (e.code == 'EADDRINUSE') {
        console.info('Address in use : ');
    }
    console.info('Failed to start server...');
    process.exit(0);
};
