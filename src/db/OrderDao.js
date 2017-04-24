const DBConnection = require('./DBConnection');

/**
 *
 * @param req
 * @param res
 * @param cb callback function contains query result
 */
function getCustomerCartOrders(cid, cb) {
  var query = 'select cart.did,dname,rname,count(cart.did) as num, sum(cart.price) as total ' +
    'from cart, dish, restaurant ' +
    'where cid = ? and cart.did = dish.did and dish.rid = restaurant.rid ' +
    'group by cart.did; ';

  DBConnection.getData(query, [cid], cb);
}

/**
 * Get all of the orders comes to this restaurant
 */
function getRestaurantOrders(restaurantId, cb) {

  var query = 'SELECT ' +
    'orders.status, orders.odate, orders.oID, orders.ordertime, ' +
    'dish.dname, dish.price, ' +
    'customer.cname, customer. address ' +
    'FROM cs542.orders AS orders ' +
    'INNER JOIN cs542.orderdetail AS order_detail ' +
    'ON orders.oID = order_detail.oID ' +
    'INNER JOIN cs542.dish AS dish ' +
    'ON order_detail.dID = dish.dID ' +
    'LEFT JOIN cs542.customer  AS customer ' +
    'ON orders.cID = customer.cID ' +
    'WHERE orders.rID = ? ;';

  DBConnection.getData(query, [restaurantId], cb);
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

  DBConnection.getData('SELECT rname as name,rzipcode as zip,type, rid FROM restaurant;', [], cb);
}


function getMyProfile(cid, cb) {

  DBConnection.getData('SELECT cname as uname, address, cID as uid FROM customer WHERE cID = ?;', [cid], cb);
}

function getRecommendationList(cb) {

  DBConnection.getData('SELECT rname as name,rzipcode as zip,type FROM restaurant WHERE rID < 5;', [], cb);
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

  DBConnection.insertData('INSERT INTO Customer (cmail, cpwd, address, czipcode, cname) VALUES (?,?,?,?,?);', [email, pwd, address, zipcode, name], cb);
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
  DBConnection.getData('select rid,sum(price) as sum, cid from cart where cid = ? group by rid', [cid], cb);
}

function cartToOrders(rid, sum, cid, cb) {

  DBConnection.insertData("insert into orders(status,sum, otime, odate, cid, rid) value('placed',?,current_time(),current_date(),?,?);", [sum, cid, rid], cb);

}

function insertOrderDetails(cid,oid,cb){
  var query = 'select oid, did, count(cartid) as num '+
              'from orders, cart '+
              'where oid = ? and cart.cid = ? '+
              'and orders.rid = cart.rid ' +
              'group by did;';


  DBConnection.getData(query, [oid,cid], cb);

}

function insertEachRowInOrderDetail(oid,did,num,cb){

  DBConnection.getData('INSERT INTO orderDetail VALUE(?,?,?);',[oid,did,num],cb);
}

function emptyCart(cid,cb){
  DBConnection.getData('DELETE FROM cart WHERE cID = ?;',[cid],cb);
}

exports.getCustomerCartOrders = getCustomerCartOrders;//ok
exports.deleteCartOrder = deleteCartOrder;//ok
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
exports.getRestaurantOrders = getRestaurantOrders;
exports.insertOrderDetails = insertOrderDetails;
exports.insertEachRowInOrderDetail = insertEachRowInOrderDetail;
exports.emptyCart = emptyCart;