const db = require('../util/database');
const util = require('util');

module.exports={
  summaryAdd:function(inputData, callback) {
    // CALL `sys`.`summaryAdd`(<{userID int}>, <{bookID int}>, <{summary varchar(10000)}>);
    var sql = util.format("CALL summaryAdd(?, ?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  summaryReadByBook:function(inputData, callback) {
    // CALL `sys`.`summaryReadByBook`(<{ID int}>);
    var sql = util.format("CALL summaryReadByBook(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  summaryReadByUser:function(inputData, callback) {
    // CALL `sys`.`summaryReadByUser`(<{ID int}>);
    var sql = util.format("CALL summaryReadByUser(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  summaryReadByID:function(inputData, callback) {
    // CALL `sys`.`summaryReadByID`(<{ID int}>);
    console.log(inputData);
    var sql = util.format("CALL summaryReadByID(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },  
  summaryDelete:function(inputData, callback) {
    // CALL `sys`.`summaryDelete`(<{ID int}>);
    var sql = util.format("CALL summaryDelete(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  summaryUpdate:function(inputData, callback) {
    // CALL `sys`.`summaryUpdate`(<{ID int}>, <{summary varchar(10000)}>);
    var sql = util.format("CALL summaryUpdate(?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  summaryLike:function(inputData, callback) {
    // CALL `sys`.`summaryLike`(<{ID int}>);
    var sql = util.format("CALL summaryLike(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  summaryReport:function(inputData, callback) {
    // CALL `sys`.`summaryReport`(<{ID int}>);
    var sql = util.format("CALL summaryReport(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  }
}
