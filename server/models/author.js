const db = require('../util/database');
const util = require('util');

module.exports={
  authorAdd:function(inputData, callback) {
    // CALL `sys`.`authorAdd`(<{authorName varchar(150)}>);
    var sql = util.format("CALL authorAdd(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  authorReadAll:function(callback) {
    // CALL `sys`.`authorReadAll`();
    var sql = util.format("CALL authorReadAll()");
    db.query(sql, function (err, data) {
      return callback(err, data);
    });
  },
  authorRead:function(inputData, callback) {
    // CALL `sys`.`authorRead`(<{pageOffest int}>, <{pageLimit int}>);
    var sql = util.format("CALL authorRead(?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  authorReadSpecific:function(inputData, callback) {
    // CALL `sys`.`authorReadSpecific`(<{authorID int}>);
    var sql = util.format("CALL authorReadSpecific(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  authorReadAllWithBooks:function(callback) {
    // CALL `sys`.`authorReadAllWithBooks`();
    var sql = util.format("CALL authorReadAllWithBooks()");
    db.query(sql, function (err, data) {
      return callback(err, data);
    });
  },
  authorDelete:function(inputData, callback) {
    // CALL `sys`.`authorDelete`(<{authorID int}>);
    var sql = util.format("CALL authorDelete(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  authorUpdate:function(inputData, callback) {
    // CALL `sys`.`authorUpdate`(<{authorID int}>, <{authorName varchar(150)}>);
    var sql = util.format("CALL authorUpdate(?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  authorView:function(inputData, callback){
    // CALL `sys`.`authorViewNumber`(<{ID int}>);
    var sql = util.format("CALL authorViewNumber(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  }
}
