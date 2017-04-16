const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'susie19910401',
  database: 'cs542_project1',
  port: 3306
});

/**
 * A module contains basic logic to interact with db
 *
 * @type {{getData: module.exports.getData, updateData: module.exports.updateData, insertData: module.exports.insertData}}
 */
module.exports = {

  // search
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