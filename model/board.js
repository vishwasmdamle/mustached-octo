
exports.initModel = function() {
    mongoose.model('Board', {name : String, lists : Object, owners : Object, members : Object, createdOn : Date, class : String, type : String}, 'content');
    contentBoard = mongoose.model('Board');
}

exports.findAll = function(callback1) {
     contentBoard.find(function(err, data){callback1(data);});
}

exports.query = function(query, callback1) {
     contentBoard.find(query, function(err, data){callback1(data);});
}

exports.insert = function(board, callback1, callback2) {
     contentBoard.find({name : board.name},
        function(err, data){
            console.log(data);
            if(data.length === 0) {
                board.type = 'board';
                contentBoard.create(board, function(err, data) {
                   if(!err) {
                       callback1(data);
                   } else {
                        callback2(err.message);
                   }
                });
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
               callback1(data);
           } else {
                callback2(err.message);
           }
        });
    } else {
        callback2('id not present!');
    }
}
exports.findById = function(id, callback1) {
     contentBoard.findById(id,function(err, data){callback1(data);});
}
