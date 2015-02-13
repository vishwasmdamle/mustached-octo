
exports.initModel = function() {
    mongoose.model('List', {name : String, note : String, rowCount : Number, type : String}, 'content');
    contentList = mongoose.model('List');
}

exports.findAll = function(callback1) {
     contentList.find(function(err, data){callback1(data);});
}

exports.query = function(query, callback1) {
     contentList.find(query, function(err, data){callback1(data);});
}

exports.insert = function(list, callback1, callback2) {
     contentList.find({name : list.name},
        function(err, data){
            console.log(data);
            if(data.length === 0) {
                list.type = 'list';
                contentList.create(list, function(err, data) {
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

exports.findByIds = function(ids, callback1) {
     console.log(ids);
     contentList.find({"_id" : {$in : ids}},function(err, data){console.log(data);callback1(data);});
}

exports.update = function(list, callback1, callback2) {
    if(list._id) {
        list.type = 'board';
        contentList.update({_id : list._id}, list, function(err, data) {
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
