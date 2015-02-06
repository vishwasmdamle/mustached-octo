
exports.initModel = function() {
    mongoose.model('Board', {name : String, lists : Object, owners : Object, createdOn : Date}, 'content');
    content = mongoose.model('Board');
}

exports.findAll = function(callback1) {
     content.find(function(err, data){callback1(data);});
 }
