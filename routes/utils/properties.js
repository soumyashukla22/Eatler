var props = {};
var PropertiesReader = require('properties-reader');
var path = require('path');
var propertiesFile = path.resolve(__dirname, "../", "../", "conf", "eatler.conf");

if (process.argv.length > 2) {
  propertiesFile = process.argv[2];
}
var properties = PropertiesReader(propertiesFile);
props.stage = properties.get("stage");

var mongoDBHost = properties.get("mongo.db.host");
var mongoDBPort = properties.get("mongo.db.port");
var mongoDBAuth = properties.get("mongo.db.auth");

props.defaultDb = "eatler";

props.getDbUrl = function (dbname) {
  return 'mongodb://' + mongoDBHost + ':' + mongoDBPort + '/' + dbname;
}
module.exports = props;