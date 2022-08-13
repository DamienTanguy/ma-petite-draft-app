"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
//var env       = process.env.NODE_ENV || "development";
//var config    = require(__dirname + '/../config/config.json')[env];
//var sequelize = new Sequelize(config.database, config.username, config.password, config);

//const sequelize = new Sequelize('postgresql://postgres:postgres@localhost:5432/MPD_database'); 
var db        = {};
var sequelize = null;

if (process.env.DATABASE_URL) {
  console.log('Heroku database');
  // the application is executed on Heroku ... use the postgres database
  var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    logging:  false, //process.env.NODE_ENV !== 'production' ? console.log : null,
	dialectOptions: { //https://stackoverflow.com/questions/58965011/sequelizeconnectionerror-self-signed-certificate
		ssl: {
		  require: true,
		  rejectUnauthorized: false
		}
	}
  })
}else {
  console.log('Local database');
  sequelize = new Sequelize('postgresql://postgres:postgres@localhost:5432/MPD_database'); 
}


fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

