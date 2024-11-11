const db = require('../util/database');
const util = require('util');

module.exports={
  bookmarkAdd:function(inputData, callback) {
    // CALL `sys`.`bookmarkAdd`(<{userID int}>, <{bookID int}>);
    var sql = util.format("CALL bookmarkAdd(?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  bookmarkRead:function(inputData, callback) {
    // CALL `sys`.`bookmarkRead`(<{ID int}>);
    var sql = util.format("CALL bookmarkRead(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  bookmarkDelete:function(inputData, callback) {
    // CALL `sys`.`bookmarkDelete`(<{userID int}>, <{bookID int}>);
    var sql = util.format("CALL bookmarkDelete(?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  }
}
