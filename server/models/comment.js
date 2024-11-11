const db = require('../util/database');
const util = require('util');

module.exports={
  commentAdd:function(inputData, callback) {
    // CALL `sys`.`commentAdd`(<{userID int}>, <{summaryID int}>, <{commentText varchar(500)}>);
    var sql = util.format("CALL commentAdd(?, ?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  commentRead:function(inputData, callback) {
    // CALL `sys`.`commentRead`(<{sID int}>);
    var sql = util.format("CALL commentRead(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  commentReadByID:function(inputData, callback) {
    // CALL `sys`.`commentReadByID`(<{ID int}>);
    var sql = util.format("CALL commentReadByID(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  commentDelete:function(inputData, callback) {
    // CALL `sys`.`commentDelete`(<{ID int}>);
    var sql = util.format("CALL commentDelete(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  commentUpdate:function(inputData, callback) {
    // CALL `sys`.`commentUpdate`(<{ID int}>, <{commentText varchar(500)}>);
    var sql = util.format("CALL commentUpdate(?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  commentReport:function(inputData, callback) {
    // CALL `sys`.`commentReport`(<{ID int}>);
    var sql = util.format("CALL commentReport(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  }
}
