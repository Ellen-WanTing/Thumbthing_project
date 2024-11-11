const db = require('../util/database');
const util = require('util');

module.exports={
  bookAddByName:function(inputData, callback) {
    /* CALL `sys`.`bookAddWithName`(<{catName varchar(150)}>, <{fullName varchar(150)}>,
    <{title varchar(150)}>, <{yearOfPublication varchar(150)}>, <{rating double}>,
    <{lan varchar(150)}>, <{image varchar(300)}>, <{publisherName varchar(150)}>); */
    var sql = util.format("CALL bookAddWithName(?, ?, ?, ?, ?, ?, ?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  bookAddByID:function(inputData, callback) {
    /* CALL `sys`.`bookAddWithID`(<{catID int}>, <{writerID int}>,
    <{title varchar(150)}>, <{yearOfPublication varchar(150)}>,
    <{rating double}>, <{lan varchar(150)}>, <{image varchar(300)}>,
    <{publisherName varchar(150)}>); */
    var sql = util.format("CALL bookAddWithID(?, ?, ?, ?, ?, ?, ?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  bookReadAll:function(callback) {
    // CALL `sys`.`bookReadAll`();
    var sql = util.format("CALL bookReadAll()");
    db.query(sql, function (err, data) {
      return callback(err, data);
    });
  },
  bookReadByFilter:function(inputData, callback) {
    /* CALL `sys`.`bookReadByFilter`(<{catID varchar(50)}>, <{authorID varchar(50)}>,
    <{bookID varchar(50)}>); */
    var sql = util.format("CALL bookReadByFilter(?, ?, ?, ?, ?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  bookReadRange:function(inputData, callback) {
    // CALL `sys`.`bookRead`(<{pageOffest int}>, <{pageLimit int}>);
    var sql = util.format("CALL bookRead(?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  bookDelete:function(inputData, callback) {
    // CALL `sys`.`bookDelete`(<{ID int}>);
    var sql = util.format("CALL bookDelete(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  bookUpdate:function(inputData, callback) {
    /* CALL `sys`.`bookUpdate`(<{ID int}>, <{catID int}>, <{writerID int}>,
      <{title varchar(150)}>, <{yearOfPublication varchar(150)}>, <{rating double}>,
      <{lan varchar(150)}>, <{image varchar(300)}>, <{publisherName varchar(150)}>); */
    var sql = util.format("CALL bookUpdate(?, ?, ?, ?, ?, ?, ?, ?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  bookReadRandom:function(callback) {
    // CALL `sys`.`bookReadRandom`();
    var sql = util.format("CALL bookReadRandom()");
    db.query(sql, function (err, data) {
      return callback(err, data);
    });
  },
  bookRating:function(inputData, callback) {
    // CALL `sys`.`bookRating`(<{ID int}>, <{rating double}>);
    var sql = util.format("CALL bookRating(?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  bookView:function(inputData, callback){
    // CALL `sys`.`bookViewNumber`(<{ID int}>);
    var sql = util.format("CALL bookViewNumber(?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  },
  addViewNumber:function(inputData, callback){
    // CALL `sys`.`addViewNumber`(<{aID int}>, <{bID int}>, <{cID int}>, <{pID int}>);
    var sql = util.format("CALL addViewNumber(?, ?, ?, ?)");
    db.query(sql, inputData, function (err, data) {
      return callback(err, data);
    });
  }
}
