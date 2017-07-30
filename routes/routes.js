const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const router = express.Router();


var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

var url = 'mongodb://localhost/usersdb';
var robots;
var unemployedrobots;
var workingrobots;

MongoClient.connect(url, function (err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  findDocuments(db, function () {
    db.close();
  });
  findAvailablehires(db, function () {
    db.close();
  });
  workingRobots(db, function () {
    db.close();
  });
});


let findDocuments = function (usersdb, callback) {
  var collection = usersdb.collection('robots');
  collection.find({}).toArray(function (err, docs) {
    robots = docs;
    callback(docs);
  });
}


let findAvailablehires = function (usersdb, callback) {
  var collection = usersdb.collection('robots');
  collection.find({ job: null }).toArray(function (err, docs) {
    unemployedrobots = docs;
    callback(docs);
  });
}

let workingRobots = function (usersdb, callback) {
  var collection = usersdb.collection('robots');
  collection.find({ job: { $nin: [null] } }).toArray(function (err, docs) {
    workingrobots = docs;
    callback(docs);
  });
}

router.get("/robot", function (req, res) {
  res.render("robot", { users: robots });
});

router.get("/workingrobots", function (req, res) {
  res.render("workingrobots", { working: workingrobots });
});

router.get("/unemployedrobots", function (req, res) {
  res.render("unemployedrobots", { nonworking: unemployedrobots });
});

module.exports = router;
