const DBConnection = require('./DBConnection');

/**
 *
 * @param req
 * @param res
 * @param cb callback function contains query result
 */
function getAllOrders(req, res, cb) {
  var query = 'SELECT joinOrderDish.oid, joinOrderDish.did, orders.rid, price, num AS quantity, dname ' +
    'FROM cs542.ORDERS orders, cs542.DISH dishes, cs542.contains joinOrderDish ' +
    'WHERE joinOrderDish.did = dishes.did AND joinOrderDish.oid = orders.oid;';

  DBConnection.getData(query, [], cb);
}

function deleteCustomerOrder(orderId, dishId, cb) {

  DBConnection.getData('DELETE FROM cs542.contains WHERE oid = ? AND dID = ?;', [orderId, dishId], cb);

}

exports.getAllOrders = getAllOrders;
exports.deleteCustomerOrder = deleteCustomerOrder;