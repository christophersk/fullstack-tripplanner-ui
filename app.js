const express = require("express");
const volleyball = require("volleyball");
const bodyparser = require("body-parser");
const path = require("path");
const nunjucks = require("nunjucks");
const db = require('./db');
const Promise = require('bluebird');

const app = express();
app.use(volleyball);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// function static(directory) {
//   return function(req, res, next) {
//     const path = req.path;  //  /bootstrap.css
//     const fs = require('fs');
//     fs.readdir(directory, function(fileNames)) {
//       if (fileNames.includes(path)) {
//         res.sendFile(directory + path)
//       } else {
//         next()
//       }
//     }
//   }
// }


app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', { noCache: true });

app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use('/jquery', express.static('node_modules/jquery/dist'));

app.get('/', function(req, res){
  let hotels = db.Hotel.findAll()
  let restaurants = db.Restaurant.findAll();
  let activities = db.Activity.findAll();

  Promise.all([hotels, restaurants, activities])
  .spread((hotels, restaurants, activities) => {
    res.render('index', { hotels, restaurants, activities })
  })
});


app.use("*", function(req, res, next) {
  const err = new Error('Page not found');
  err.status = 404;
  next(err)
});

app.use(function(err, req, res, next) {
  const message = err.message;
  const status = err.status || 500;
  const stack = err.stack
  res.render("error.html", {message, status, stack});
});


app.listen(3001, function() {
  console.log("server has started");
});
