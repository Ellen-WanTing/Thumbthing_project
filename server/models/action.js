const db = require('../util/database');
const util = require('util');

module.exports={
  actionAdd:function(inputData, callback) {
    // CALL `sys`.`actionAdd`(<{uID int}>, <{bID int}>, <{sID int}>, <{cID int}>, <{aLabel varchar(100)}>);
    var sql = util.format("CALL actionAdd(?, ?, ?, ? ,?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  actionRead:function(inputData, callback) {
    // CALL `sys`.`actionCheck`(<{userID int}>, <{subjectID int}>, <{subjectLabel varchar(100)}>, <{actionLabel varchar(100)}>);
    var sql = util.format("CALL actionCheck(?, ? ,? ,?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  actionDelete:function(inputData, callback) {
    // CALL `sys`.`actionDelete`(<{userID int}>, <{subjectID int}>, <{subjectLabel varchar(100)}>, <{actionLabel varchar(100)}>);
    var sql = util.format("CALL actionDelete(?, ? ,? ,?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  }
}
