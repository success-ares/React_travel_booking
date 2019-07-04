var mysql = require('mysql');
var dbconfig = {
    'host': process.env.DB_HOST,
    'database': process.env.DB_DATABASE,
    'user': process.env.DB_USERNAME,
    'password': process.env.DB_PASSWORD,
};
var pool = mysql.createPool(dbconfig);
pool.getConnection(function (err, conn) {
    conn.query('USE ' + dbconfig.database, function () {
        conn.release();
    });
});

// Returns a connection to the db
var getConnection = function (callback) {
    pool.getConnection(function (err, conn) {
        callback(err, conn);
    });
};

// Helper function for querying the db; releases the db connection
// callback(err, rows)
var query = function (queryString, params, callback) {
    getConnection(function (err, conn) {
        conn.query(queryString, params, function (err, rows) {
            conn.release();
            if (err)
                return callback(err);

            return callback(err, rows);
        });
    });
};

var insert = function (table, col_names, rows, callback) {
    getConnection(function (err, conn) {
        // console.log(rows);
        var queryString = 'Insert into ' + table + '(' + col_names.join() + ') values (' + col_names.map(c => '?').join() + ')';
        var sqls = rows.map(row => mysql.format(queryString, row));
        var p = sqls.map(sql => {
            new Promise((resolve, reject) => {
                console.log(sql);
                conn.query(sql, function (err, resp) {
                    resolve()
                });
            })
        });
        Promise.all(p).then(() => {
            conn.query("Select last_insert_id() as insert_id", function (err, resp) {
                conn.release();

                if (err)
                    return callback(err);

                return callback(err, resp[0].insert_id);
            });
        }).catch(err => {
            callback(err)
        })
    });
};


exports.query = query;
exports.insert = insert;