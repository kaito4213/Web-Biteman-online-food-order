const DBConnection = require('./DBConnection');

/**
 *
 * @param req
 * @param res
 * @param cb callback function contains query result
 */
function getCustomerCartOrders(cid, cb) {
  var query = 'select cart.did,dname,rname,count(cart.did) as num, sum(cart.price) as total '+
              'from cart, dish, restaurant '+
              'where cid = ? and cart.did = dish.did and dish.rid = restaurant.rid '+
              'group by cart.did; ';

  DBConnection.getData(query, [cid], cb);
}

function deleteCartOrder(cid, dishId, cb) {

  DBConnection.getData('DELETE FROM cart WHERE dID = ? AND cid = ? ;', [dishId, cid], cb);

}

function getCustLoginInfo(email, cb) {

  DBConnection.getData('SELECT cpwd as pwd, cID FROM customer WHERE cmail = ?;', [email], cb);
}

function getRestaurantLoginInfo(email, cb) {

  DBConnection.getData('SELECT rpwd as pwd, rid FROM restaurant WHERE rmail = ?;', [email], cb);
}

function getRestaurantList(cb) {

  DBConnection.getData('SELECT rname,rzipcode as zip,type, rid FROM restaurant;', [], cb);
}

function getMyProfile(cid, cb) {

  DBConnection.getData('SELECT cname as uname, address, cID as uid FROM customer WHERE cID = ?;', [cid], cb);
}

function getRecommendationList(cb) {

  DBConnection.getData('SELECT rname,rzipcode as zip,type FROM restaurant WHERE rID < 5;', [], cb);
}

function getMenuForCustomer(rid, cb) {

  DBConnection.getData('SELECT did, rid, dname, description, price FROM DISH WHERE rid = ?;', [rid], cb);
}

function getMyOrderHistory(cid, cb) {

  var query = 'SELECT orders.oid, rname, odate, otime, sum as price, status ' +
    'FROM orders, restaurant ' +
    'WHERE orders.rid = RESTAURANT.rid ' +
    'AND orders.cid = ?; ';

  DBConnection.getData(query, [cid], cb);
}

function addCustomer(address, zipcode, name, pwd, email, cb) {

  DBConnection.insertData('INSERT INTO Customer (cmail, cpwd, address, czipcode, cname) VALUES (?,?,?,?,?);', [email,pwd,address,zipcode,name], cb);
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
  DBConnection.insertData('INSERT INTO Cart(did,rid,price,cid) VALUE (?,?,?,?);', [did, rid, price, cid], cb);
}

function placeOrder(cid, cb) {
  DBConnection.getData('select rid,sum(price) as sum, cid from cart where cid = ? group by rid',[cid],cb);
}

function cartToOrders(key, rid, sum, cid, cb) {
  DBConnection.insertData("insert into orders(status,sum, otime, odate, cid, rid) value('placed',?,current_time(),current_date(),?,?);", [sum, cid,rid], cb);

}

exports.getCustomerCartOrders = getCustomerCartOrders;//ok.....changename:
exports.deleteCartOrder = deleteCartOrder;//ok.....changename: add cid
exports.getCustLoginInfo = getCustLoginInfo;//ok
exports.getRestaurantLoginInfo = getRestaurantLoginInfo;//ok
exports.getRestaurantList = getRestaurantList;//ok
exports.getMyProfile = getMyProfile;//ok
exports.getRecommendationList = getRecommendationList;//ok
exports.getMenuForCustomer = getMenuForCustomer;//ok
exports.getMyOrderHistory = getMyOrderHistory;//ok
exports.addCustomer = addCustomer;//ok
exports.updateOrderStatusCustomer = updateOrderStatusCustomer;//ok
exports.addFoodtoCart = addFoodtoCart;//ok
exports.placeOrder = placeOrder;//ok
exports.getRestaurantMenu = getRestaurantMenu;//ok
exports.cartToOrders = cartToOrders;//ok