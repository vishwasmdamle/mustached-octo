
exports.initModel = function() {
    mongoose.model('Board', {name : String, lists : Object, owners : Object, createdOn : Date}, 'content');
    content = mongoose.model('Board');
}

exports.findAll = function(callback1) {
     content.find(function(err, data){callback1(data);});
}

exports.query = function(query, callback1) {
     content.find(query, function(err, data){callback1(data);});
}

exports.insert = function(board, callback1, callback2) {
     content.find({name : board.name},
        function(err, data){
            console.log(data);
            if(data.length === 0) {
                content.create(board, function(err, data) {
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

exports.findById = function(id, callback1) {
     content.findById(id,function(err, data){callback1(data);});
}
