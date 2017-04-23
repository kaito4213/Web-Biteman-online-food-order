var config = require('./webpack.config');
const OrderDao = require('./src/db/OrderDao');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// delete myorder in cart according to the orderID and dishID
app.post('/deleteMyOrder', function (req, res) {
  var orderId = req.body.orderId;
  var dishId = req.body.dishId;

  function cb(result) {
    res.json({success: result});
  }

  OrderDao.deleteCustomerOrder(orderId, dishId, cb);

});

// endpoint to get all of the orders of a customer or merchant
app.get('/getMyOrders', function (req, res) {
  function returnAllOrders(result) {
    res.json({orderInfo: result});
  }

  // todo: should not pass req & res to DAO
  OrderDao.getAllOrders(req, res, returnAllOrders);
});

app.post('/updateOrderStatus', function (req, res) {
  function isUpdateOrderStatusSuccess(updatedRows) {
    var isUpdateOrderStatusSuccess = updatedRows > 0;
    res.json({isUpdateOrderStatusSuccess: isUpdateOrderStatusSuccess});
  }

  var orderId = req.body.orderId;
  var newOrderStatus = req.body.newOrderStatus;

  OrderDao.updateOrderStatusCustomer(orderId, newOrderStatus, isUpdateOrderStatusSuccess);
});

// get password in order to check the user login
app.post('/getLoginInfo', function (req, res) {
  var inputEmail = req.body.email;
  var table = req.body.table;

  function returnPwd(result) {
    res.json({loginInfo: result});
  }

  if (table === 'customer')
    OrderDao.getCustLoginInfo(inputEmail, returnPwd);
  else
    OrderDao.getRestaurantLoginInfo(inputEmail, returnPwd);
})

//get all restaurant rows
app.get('/getRestaurantList', function (req, res) {
  function returnAllRestaurants(result) {
    res.json({restaurantList: result});
  }

  OrderDao.getRestaurantList(returnAllRestaurants);
});


//get personal information shown in profile page
app.post('/getMyProfile', function (req, res) {
  var customerID = req.body.customerID;

  function returnMyProfile(result) {
    res.json({profile: result});
  }

  OrderDao.getMyProfile(customerID, returnMyProfile);
});

//get recommend restaurant
app.get('/getRecommendationList', function (req, res) {
  function returnRecommendationList(result) {
    res.json({recommendation: result});
  }

  OrderDao.getRecommendationList(returnRecommendationList);
});

//get restaurant menu for customer to choose
app.post('/getMenuForCustomer', function (req, res) {
  var rid = req.body.restaurantId;

  function returnMenuForCustomer(result) {
    res.json({MenuForCustomer: result});
  }

  OrderDao.getMenuForCustomer(rid, returnMenuForCustomer);
});

//get personal order history shown in order list page
app.post('/getMyOrderHistory', function (req, res) {
  var customerID = req.body.customerID;

  function returnOrderHistory(result) {
    res.json({orderHistory: result});
  }

  OrderDao.getMyOrderHistory(customerID, returnOrderHistory);
});

//insert new customer into database
app.post('/addCustomer', function (req, res) {
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var address = req.body.address;
  var zipcode = req.body.zipcode;
  var password = req.body.password;

  function returnResult(result) {
    res.json({success: result});
  }

  OrderDao.addCustomer(address, zipcode, userName, password, userEmail, returnResult);
});

//get menu for restaurant user
app.post('/getMenuForRestaurant', function (req, res) {
  var restaurantID = req.body.restaurantID;

  function returnMenuForRestaurant(result) {
    res.json({restaurantMenu: result});
  }

  OrderDao.getRestaurantMenu(restaurantID, returnMenuForRestaurant);
});


// this must be the last route, all endpoints go prior to this
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 3000;

app.listen(port, function () {
  console.log('listening on port: ' + port);
});
