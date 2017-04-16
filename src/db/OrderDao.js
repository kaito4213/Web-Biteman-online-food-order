const DBConnection = require('./DBConnection');

/**
 *
 * @param req
 * @param res
 * @param cb callback function contains query result
 */
function getAllOrders(req, res, cb) {
  DBConnection.getData('SELECT * FROM cs542_project1.food_tbl', [], cb);
}

function getOrderByCustomerId(req, res, cb) {

}

exports.getAllOrders = getAllOrders;