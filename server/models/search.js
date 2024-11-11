const db = require('../util/database');
const util = require('util');

module.exports={
  searchBook:function(inputData, callback) {
    /* CALL `sys`.`searchBook`(<{keyword varchar(500)}>, <{catActive boolean}>,
    <{authorActive boolean}>, <{publisherActive boolean}>, <{bookActive boolean}>,
    <{orderCatActive boolean}>, <{orderAuthorActive boolean}>, <{orderPublisherActive boolean}>,
    <{pageOffest int}>, <{pageLimit int}>); */
    var sql = util.format("CALL searchBook(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  searchSummary:function(inputData, callback) {
    // CALL `sys`.`searchSummary`(<{keyword varchar(500)}>, <{pageOffest int}>, <{pageLimit int}>);
    var sql = util.format("CALL searchSummary(?, ?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  }
}
