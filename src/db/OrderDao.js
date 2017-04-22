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

function getCustLoginInfo(email, cb) {

  DBConnection.getData('SELECT pwd, cID FROM customer WHERE email = ?;',[email], cb );
}

function getRestaurantLoginInfo(email, cb) {

  DBConnection.getData('SELECT pwd FROM restaurant WHERE email = ?;',[email], cb );
}

function getRestaurantList(cb){

  DBConnection.getData('SELECT name,rzipcode as zip,type, rid FROM restaurant;', [], cb );
}

function getMyProfile(cid, cb){

  DBConnection.getData('SELECT cname as uname, address, cID as uid FROM customer WHERE cID = ?;',[cid], cb);
}

function getRecommendationList(cb) {

  DBConnection.getData('SELECT name,rzipcode as zip ,type FROM restaurant WHERE rID < 5;', [], cb);
}

function getMenuForCustomer(rid, cb) {

  DBConnection.getData('SELECT did, rid, dname, description, price FROM DISH WHERE rid = ?;', [rid], cb);
}

exports.getAllOrders = getAllOrders;
exports.deleteCustomerOrder = deleteCustomerOrder;
exports.getCustLoginInfo = getCustLoginInfo;
exports.getRestaurantLoginInfo = getRestaurantLoginInfo;
exports.getRestaurantList = getRestaurantList;
exports.getMyProfile = getMyProfile;
exports.getRecommendationList = getRecommendationList;
exports.getMenuForCustomer = getMenuForCustomer;