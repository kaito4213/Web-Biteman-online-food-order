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
    console.log(result);
    res.json({orderInfo: result});
  }

  // todo: should not pass req & res to DAO
  OrderDao.getAllOrders(req, res, returnAllOrders);
});

// this must be the last route, all endpoints go prior to this
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 3000;

app.listen(port, function () {
  console.log('listening on port: ' + port);
});
