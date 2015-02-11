encryption =  require('../authentication.js');
exports.initModel = function() {
    mongoose.model('User', {name : String, username : String, password : String}, 'user');
    user = mongoose.model('User');
}

exports.authenticate = function(username, password, success, failure) {
       user.find({username : username},
        function(err, data){
            if(data.length > 0) {
                if(encryption.compare(password, data[0].password)) {
                    userData = data[0].toObject();
                    delete userData.password;
                    success(userData);
                    return;
                }
                if(failure)failure(err);
            }
            else {
                if(failure)
                    failure(err);
            }
        }
    );
}
