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

  DBConnection.getData('SELECT pwd, cID FROM customer WHERE email = ?;', [email], cb);
}

function getRestaurantLoginInfo(email, cb) {

  DBConnection.getData('SELECT pwd FROM restaurant WHERE email = ?;', [email], cb);
}

function getRestaurantList(cb) {

  DBConnection.getData('SELECT name,rzipcode as zip,type, rid FROM restaurant;', [], cb);
}

function getMyProfile(cid, cb) {

  DBConnection.getData('SELECT cname as uname, address, cID as uid FROM customer WHERE cID = ?;', [cid], cb);
}

function getRecommendationList(cb) {

  DBConnection.getData('SELECT name,rzipcode as zip ,type FROM restaurant WHERE rID < 5;', [], cb);
}

function getMenuForCustomer(rid, cb) {

  DBConnection.getData('SELECT did, rid, dname, description, price FROM DISH WHERE rid = ?;', [rid], cb);
}

function getMyOrderHistory(cid, cb) {

  var query = 'SELECT orders.oid, restaurant.name, odate, ordertime, price, orders.status ' +
    'FROM orders, dish,restaurant ' +
    'WHERE orders.did = dish.did ' +
    'AND orders.rid = RESTAURANT.rid ' +
    'AND orders.cid = ?; ';

  DBConnection.getData(query, [cid], cb);
}

function addCustomer(address, zipcaode, name, pwd, email, cb) {

  DBConnection.insertData('INSERT INTO customer VALUE (now(),?,?,?,?,?);', [address, zipcaode, name, pwd, email], cb);
}

function getRestaurantMenu(rid, cb) {
  DBConnection.getData('SELECT did, dname, description, price FROM DISH WHERE rid = ?;', [rid], cb);
}

/**
 * Function for a customer to update the status of the order
 */
function updateOrderStatusCustomer(orderId, updatedStatus, cb) {
  DBConnection.updateData('UPDATE cs542.orders SET status = ? WHERE oID = ?;', [updatedStatus, orderId], cb);
}


exports.getAllOrders = getAllOrders;
exports.deleteCustomerOrder = deleteCustomerOrder;
exports.getCustLoginInfo = getCustLoginInfo;
exports.getRestaurantLoginInfo = getRestaurantLoginInfo;
exports.getRestaurantList = getRestaurantList;
exports.getMyProfile = getMyProfile;
exports.getRecommendationList = getRecommendationList;
exports.getMenuForCustomer = getMenuForCustomer;
exports.getMyOrderHistory = getMyOrderHistory;
exports.addCustomer = addCustomer;
exports.updateOrderStatusCustomer = updateOrderStatusCustomer;