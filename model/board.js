
exports.initModel = function() {
    mongoose.model('Board', {name : String, lists : Object, owners : Object, members : Object, createdOn : Date, class : String, type : String}, 'content');
    contentBoard = mongoose.model('Board');
}

exports.findAll = function(callback1) {
     contentBoard.find(
        function(err, data) {
            if(callback1)
                callback1(data);
        }
     );
}

exports.query = function(query, callback1) {
     contentBoard.find(query,
        function(err, data) {
            if(callback1)
                callback1(data);
        }
     );
}

exports.insert = function(board, callback1, callback2) {
     contentBoard.find({name : board.name},
        function(err, data){
            if(data.length === 0) {
                board.type = 'board';
                contentBoard.create(board,
                    function(err, data) {
                        if(!err) {
                            if(callback1)
                                callback1(data);
                        } else {
                            if(callback2)
                                callback2(err.message);
                        }
                    }
                );
            } else {
                data = {error : 'Board With Same Name Already Exists!'};
                if(callback2)
                    callback2(data);
            }
        }
     );
}

exports.update = function(board, callback1, callback2) {
    if(board._id) {
        board.type = 'board';
        contentBoard.update({_id : board._id}, board, function(err, data) {
            if(!err) {
                if(callback1)
                    callback1(data);
           } else {
                if(callback2)
                    callback2(err.message);
           }
        });
    } else {
        callback2('id not present!');
    }
}

exports.delete = function(id, callback1) {
     contentBoard.remove({"_id" : id},
        function(err, data) {
            if(callback1)
                callback1(data);
        }
     );
}

exports.findById = function(id, callback1) {
     contentBoard.findById(id,
        function(err, data) {
            if(callback1)
                callback1(data);
        }
     );
}

