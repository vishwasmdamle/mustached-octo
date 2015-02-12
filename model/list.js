
exports.initModel = function() {
    mongoose.model('List', {note : String, author : String, type : String}, 'content');
    contentList = mongoose.model('List');
}

exports.findAll = function(callback1) {
     contentList.find(function(err, data){callback1(data);});
}

exports.query = function(query, callback1) {
     contentList.find(query, function(err, data){callback1(data);});
}

exports.insert = function(contentList, callback1, callback2) {
     contentList.find({name : contentList.name},
        function(err, data){
            console.log(data);
            if(data.length === 0) {
                contentList.create(contentList, function(err, data) {
                   if(!err) {
                       callback1(data);
                   } else {
                        callback2(err.message);
                   }
                });
            } else {
                data = {error : 'List With Same Name Already Exists!'};
                if(callback2)
                    callback2(data);
            }
        }
     );
}

exports.findById = function(id, callback1) {
     contentList.findById(id,function(err, data){callback1(data);});
}
