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
                    if(success)
                        success(userData);
                    return;
                }
                if(failure)
                    failure(err);
            }
            else {
                if(failure)
                    failure(err);
            }
        }
    );
}

exports.findByUsername = function(username, success, failure) {
        console.log(username);
       user.find({username : username},
        function(err, data){
            console.log(data);
            console.log(success);
            console.log(failure);
            if(data.length > 0) {
                if(failure)
                    failure();
            }
            else {
                if(success)
                    success();
            }
        }
    );
}


exports.insert = function(userObject, callback1, callback2) {
     user.find({username : userObject.username},
        function(err, data){
            if(data.length === 0) {
                userObject.password = encryption.encrypt(userObject.password);
                user.create(userObject, function(err, data) {
                   if(!err) {
                       if(callback1)
                            callback1(data);
                   } else {
                        if(callback2)
                            callback2(err.message);
                   }
                });
            } else {
                data = {error : 'User With Same Username Already Exists!'};
                if(callback2)
                    callback2(data);
            }
        }
    );
}
