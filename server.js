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
  var dishId = req.body.dishId;

  function cb(result) {
    res.json({success: result});
  }

  OrderDao.deleteCartOrder(dishId, cb);

});

// endpoint to get all of the orders of a customer
app.post('/getMyCart', function (req, res) {
  var cid = req.body.customerID;

  function returnAllOrders(result) {
    res.json({orderInfo: result});
  }

  OrderDao.getCustomerCartOrders(cid, returnAllOrders);
});

/**
 * endpoint for a customer to update order status
 *
 * @return whether or not the update is successful
 */
app.post('/updateOrderStatusCustomer', function (req, res) {
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

//add food to cart
app.post('/addFoodtoCart', function (req, res) {

  var cid = req.body.customerId,
    rid = req.body.restaurantId,
    did = req.body.dishId,
    price = req.body.price;

  function returnResult(result) {
    res.json({result: result});
  }

  OrderDao.addFoodtoCart(did, cid, rid, price, returnResult);
});

//place order: move cart items into orders table, then delete cart items by customer id
app.post('/placeOrder', function (req, res) {

  var cartItems = req.body.cartItems;
  var cid = req.body.customerID;

  function returnResult(result) {

   // move cart intem to orders
    var orderNum = result.length;

    for(i=0; i<orderNum; i++){

      function returnInsertedOrder(addToOrdersResult) {
        console.log('test...');
      }
       OrderDao.cartToOrders(Math.floor(Math.random() * 1000), result[i].rid, result[i].sum, result[i].cid, returnInsertedOrder);
    }
  }

  OrderDao.placeOrder(cid, returnResult);
});


// this must be the last route, all endpoints go prior to this
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 3000;

app.listen(port, function () {
  console.log('listening on port: ' + port);
});
