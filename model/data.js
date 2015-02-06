
exports.initModel = function() {
    mongoose.model('Board', {name : String, lists : Object, owners : Object, createdOn : Date}, 'content');
    content = mongoose.model('Board');
//    mongoose.model('List', {name : String, card : [], })
}

exports.findAll = function(callback1) {
     content.find(function(err, data){callback1(data);});
}

exports.query = function(query, callback1) {
     content.find(query, function(err, data){callback1(data);});
}

exports.findById = function(id, callback1) {
     content.findById(id,function(err, data){callback1(data);});
}
