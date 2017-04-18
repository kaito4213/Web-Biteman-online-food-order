// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
const OrderDao = require('./src/db/OrderDao');
//
// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   historyApiFallback: true
// }).listen(3000, 'localhost', function (err, result) {
//   if (err) {
//     console.log(err);
//   }
//
//   console.log('Listening at localhost:3000');
// });
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
    //console.log(result);
    res.json({orderInfo: result});
  }

  // todo: should not pass req & res to DAO
  OrderDao.getAllOrders(req, res, returnAllOrders);
});

// get passord in order to check the user login
app.post('/getLoginInfo', function (req, res) {

    var inputEmail = req.body.email;
    var table = req.body.table

    function returnPwd(result) {
      //console.log(result);
      res.json({loginInfo: result});
    }

    if(table == 'customer')
      OrderDao.getCustLoginInfo(inputEmail, returnPwd);
    else
      OrderDao.getRestaurantLoginInfo(inputEmail, returnPwd);
  })

//get all restaurant rows
app.get('/getRestaurantList', function (req, res) {
  function returnAllRestaurants(result) {
    //console.log(result);
    res.json({restaurantList: result});
  }

  OrderDao.getRestaurantList(returnAllRestaurants);
});

//get some restaurant rows
app.get('/getRestaurantList', function (req, res) {
  function returnAllRestaurants(result) {
    //console.log(result);
    res.json({restaurantList: result});
  }

  OrderDao.getRestaurantList(returnAllRestaurants);
});

//get personal information shown in profile page
app.get('/getMyProfile', function (req, res) {
  function returnMyProfile(result) {
    //console.log(result);
    res.json({profile: result});
  }

  OrderDao.getMyProfile(returnMyProfile);
});

//get recommend restaurant
app.get('/getRecommendationList', function (req, res) {
  function returnRecommendationList(result) {
    //console.log(result);
    res.json({recommendation: result});
  }

  OrderDao.getRecommendationList(returnRecommendationList);
});

//get restaurant menu for customer to choose
app.get('/getMenuForCustomer', function (req, res) {
  function returnMenuForCustomer(result) {
    console.log(result);
    res.json({MenuForCustomer: result});
  }

  OrderDao.getMenuForCustomer(returnMenuForCustomer);
});

// this must be the last route, all endpoints go prior to this
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 3000;

app.listen(port, function () {
  console.log('listening on port: ' + port);
});
