const DBConnection = require('./DBConnection');

/**
 *
 * @param req
 * @param res
 * @param cb callback function contains query result
 */
function getAllOrders(cid, cb) {
  var query = 'select cart.did,dname,restaurant.name as rname,count(cart.did) as num, sum(cart.price) as total '+
              'from cart, dish, restaurant '+
              'where cid = ? and cart.did = dish.did and dish.rid = restaurant.rid '+
              'group by cart.did; ';

  DBConnection.getData(query, [cid], cb);
}

function deleteCustomerOrder(dishId, cb) {

  DBConnection.getData('DELETE FROM cart WHERE dID = ?;', [dishId], cb);

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

function addFoodtoCart(did, cid, rid, price, cb) {
  DBConnection.insertData('INSERT INTO Cart VALUE (Now(),?,?,?,?);', [did, cid, rid, price], cb);
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
exports.addFoodtoCart = addFoodtoCart;
