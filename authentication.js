var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

exports.encrypt = function(string) {
    return bcrypt.hashSync(string, salt);
};

exports.compare = function(string, hash) {
    return bcrypt.compareSync(string, hash);
}