const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 1000,
  acquireTimeout: 100000, //30 secs
  host: 'localhost',
  user: 'root',
  password: 'susie19910401',
  database: 'cs542',
  port: 3306
});

/**
 * A module contains basic logic to interact with db
 *
 * @type {{getData: module.exports.getData, updateData: module.exports.updateData, insertData: module.exports.insertData}}
 */
module.exports = {

  // query
  getData: function (preparedSql, arr, cb) {
    pool.getConnection(function (err, conn) {
      if (err) console.log("POOL " + err);
      conn.query(preparedSql, arr, function (err, rows) {
        if (err) console.log(err);
        cb(rows);
        conn.release();
      });
    });
  },

  // update
  updateData: function (preparedSql, arr, cb) {
    pool.getConnection(function (err, conn) {
      if (err) console.log("POOL " + err);
      conn.query(preparedSql, arr, function (err, result) {
        if (err) throw err;
        cb(result.changedRows);
        conn.release();
      });
    });
  },

  // insert
  insertData: function (preparedSql, arr, cb) {
    pool.getConnection(function (err, conn) {
      if (err) console.log("POOL" + err);
      conn.query(preparedSql, arr, function (err, result) {
        if (err) throw err;
        cb(result);
        conn.release();
      });
    });
  }
};