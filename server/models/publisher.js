const db = require('../util/database');
const util = require('util');

module.exports={
  publisherAdd:function(inputData, callback) {
    // CALL `sys`.`publisherAdd`(<{publisherName varchar(150)}>);
    var sql = util.format("CALL publisherAdd(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  publisherReadAll:function(callback) {
    // CALL `sys`.`publisherReadAll`();
    var sql = util.format("CALL publisherReadAll()");
    db.query(sql, function (err, data) {
      return callback(err, data);
    });
  },
  publisherReadSpecific:function(inputData, callback) {
    // CALL `sys`.`publisherReadSpecific`(<{ID int}>);
    var sql = util.format("CALL publisherReadSpecific(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  publisherReadRange:function(inputData, callback) {
    // CALL `sys`.`publisherRead`(<{pageOffest int}>, <{pageLimit int}>);
    var sql = util.format("CALL publisherRead(?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  publisherReadAllWithBooks:function(callback) {
    // CALL `sys`.`publisherReadAllWithBooks`();
    var sql = util.format("CALL publisherReadAllWithBooks()");
    db.query(sql, function (err, data) {
      return callback(err, data);
    });
  },
  publisherDelete:function(inputData, callback) {
    // CALL `sys`.`publisherDelete`(<{ID int}>);
    var sql = util.format("CALL publisherDelete(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  publisherUpdate:function(inputData, callback) {
    // CALL `sys`.`publisherUpdate`(<{ID int}>, <{publisherName varchar(150)}>);
    var sql = util.format("CALL publisherUpdate(?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  publisherView:function(inputData, callback){
    // CALL `sys`.`publisherViewNumber`(<{ID int}>);
    var sql = util.format("CALL publisherViewNumber(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  }
}
