// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
const DBConnections = require('./src/db/DBConnection.js');
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
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

var port = 3000;


app.listen(port, function () {

  function cb(data) {
    console.log(data);
  }

  DBConnections.getData('SELECT * FROM cs542_project1.food_tbl', [], cb);

  console.log('listening on port: ' + port);
});
