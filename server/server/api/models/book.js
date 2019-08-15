var db = require('../../config/db');

var create = function (body, callback) {
    
            db.insert('books', Object.keys(body), [Object.keys(body).map(col => body[col])], function (err, id) {
                callback(err, id)
            })

}

var hotelcreate = function (body, callback){
    db.insert('hotelbooks',Object.keys(body),[Object.keys(body).map(col => body[col])], function (err,id) {
        callback(err,id)
    })
}


exports.create = create
exports.hotelcreate = hotelcreate;