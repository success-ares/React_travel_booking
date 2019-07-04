var bcrypt = require('bcrypt-nodejs');

var db = require('../../config/db');
// Set up User class
var User = function (user) {
    var that = new Object();
    that.id = user.id;
    that.email = user.email;
    that.password = user.password;
    that.firstname = user.firstname;
    that.lastname = user.lastname;
    that.phonenumber = user.phonenumber;
    that.city = user.city;
    that.country = user.country;
    that.postal = user.postal;
    that.birthday = user.birthday;
    that.province = user.province;
    return that;
};

// Hash and salt the password with bcrypt
var hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check if password is correct
var validPassword = function (password, savedPassword) {
    return bcrypt.compareSync(password, savedPassword);
};

var login = function (email, password, callback) {
    // Check that the user logging in exists
    db.query('SELECT users.* FROM users WHERE (users.email = ?) ', [email, email], function (err, rows) {
        if (err) {
            return callback(err);
        }
        if (!rows.length)
            return callback(null, false);

        if (password == rows[0].password) {
            return callback(null, true, new User(rows[0]));
        } else if (validPassword(password, rows[0].password)) {
            return callback(null, true, new User(rows[0]));
        } else {
            return callback(null, false, new User(rows[0]));
        }

    });
};

var getByEmail = function (email, callback) {
    db.query('SELECT * FROM users WHERE email = ?', [email], function (err, list) {
        callback(err, list)
    })
}

var updatePwd = function (body, callback) {
    db.query('UPDATE users SET ? WHERE id = ?', [{ password: hashPassword(body.pwd), visited: 1 }, body.id], function (err) {
        callback(err)
    })
}

var create = function (body, callback) {
    db.query('SELECT * FROM users WHERE email = ?', [body.email], function (err, list) {
        body.password = hashPassword(body.password);
        if (err) {
            callback(null)
        } else if (list.length > 0) {
            callback(null, list[0].id)
        } else {
            db.insert('users', Object.keys(body), [Object.keys(body).map(col => body[col])], function (err, id) {
                callback(err, id)
            })
        }
    })

}

var remove = function (id, callback) {
    db.query(`
        DELETE FROM users WHERE id = ?
    `, [id], function (err, list) {
            callback(err, list)
        })
}

exports.create = create
exports.remove = remove
exports.login = login
exports.getByEmail = getByEmail
exports.updatePwd = updatePwd