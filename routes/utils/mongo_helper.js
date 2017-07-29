var MongoClient = require('mongodb').MongoClient;
var props = require('./properties');
var helper = require('./helper');

var mongo_helper = {};
var client = null;

mongo_helper.getDB = function (cb, dbName) {
  var reqDB = dbName;
  if (!helper.isDefined(reqDB)) {
    reqDB = props.defaultDb;
  }
  if (client != null) {
    cb(client);
  } else {
    var dbUrl = props.getDbUrl(reqDB);
    MongoClient.connect(dbUrl, function (err, db) {
      if (err) {
        console.log('Failed to connect to %s, %s', dbUrl, err, {});
      } else {
        console.log('Mongo Client connected to: ' + dbUrl);
        client = db;
        cb(db);
      }
    });
  }
};

mongo_helper.find = function (collName, cb) {
  mongo_helper.getDB(function (db) {
    db.collection(collName).find().toArray(cb);
  });
};

mongo_helper.find = function (criteria, collName, cb) {
  mongo_helper.getDB(function (db) {
    db.collection(collName).find(criteria).toArray(cb);
  });
};

mongo_helper.save = function (criteria, toSaveObj, collName, cb) {
  mongo_helper.getDB(function (db) {
    db.collection(collName)
      .updateOne(criteria, toSaveObj, {upsert: true}, cb);
  });
};


module.exports = mongo_helper;