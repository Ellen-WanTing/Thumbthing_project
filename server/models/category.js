const db = require('../util/database');
const util = require('util');

module.exports={
  categoryAdd:function(inputData, callback) {
    // CALL `sys`.`categoryAdd`(<{catName varchar(150)}>, <{parentCatID int}>);
    var sql = util.format("CALL categoryAdd(?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  categoryReadAll:function(callback) {
    // CALL `sys`.`categoryReadAll`();
    var sql = util.format("CALL categoryReadAll()");
    db.query(sql, function (err, data) {
      return callback(err, data);
    });
  },
  categoryReadByParent:function(inputData, callback) {
    // CALL `sys`.`categoryReadByParent`(<{catID int}>);
    var sql = util.format("CALL categoryReadByParent(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  categoryReadRange:function(inputData, callback) {
    // CALL `sys`.`categoryRead`(<{pageOffest int}>, <{pageLimit int}>);
    var sql = util.format("CALL categoryRead(?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  categoryReadByID:function(inputData, callback) {
    // CALL `sys`.`categoryReadByID`(<{catID int}>);
    var sql = util.format("CALL categoryReadByID(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  categoryDelete:function(inputData, callback) {
    // CALL `sys`.`categoryDelete`(<{catID int}>);
    var sql = util.format("CALL categoryDelete(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  categoryUpdate:function(inputData, callback) {
    // ALL `sys`.`categoryUpdate`(<{catID int}>, <{parentID int}>, <{catName varchar(150)}>);
    var sql = util.format("CALL categoryUpdate(?, ?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  categoryView:function(inputData, callback){
    // CALL `sys`.`categoryViewNumber`(<{ID int}>);
    var sql = util.format("CALL categoryViewNumber(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  }
}
