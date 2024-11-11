const model = require('../models/action');
const errorFactory = require('../util/errorFactory');

module.exports={
  actionAdd:function(req, res){
    // check if the api requester is accessing its own data and not others.
    if (req.body.userID != req.userID) {
      errorFactory.errorHandler(res, 401, "Access Denied.", null);
      return;
    }
    var inputData;
    if (req.body.subjectLabel == "Book") {
      inputData = [req.body.userID, req.body.subjectID, null, null, req.body.actionLabel];
    }
    else if (req.body.subjectLabel == "Summary") {
      inputData = [req.body.userID, null, req.body.subjectID, null, req.body.actionLabel];
    }
    else if (req.body.subjectLabel == "Comment") {
      inputData = [req.body.userID, null, null, req.body.subjectID, req.body.actionLabel];
    }
    const checkData = [req.body.userID, req.body.subjectID, req.body.subjectLabel, req.body.actionLabel];
    model.actionRead(checkData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      if (data[0].length == 0) {
        model.actionAdd(inputData, function(err, data){
          if (err) {
            errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
            return;
          }
          res.status(201);
          res.json({
               result: 'action added.'
          });
        });
      }
      else {
        res.status(400);
        res.json({
             result: 'already done.'
        });
      }
    });
  },
  actionAddByInput:function(userID, subjectLabel, subjectID, actionLabel, callback){
    var inputData;
    if (subjectLabel == "Book") {
      inputData = [userID, subjectID, null, null, actionLabel];
    }
    else if (subjectLabel == "Summary") {
      inputData = [userID, null, subjectID, null, actionLabel];
    }
    else if (subjectLabel == "Comment") {
      inputData = [userID, null, null, subjectID, actionLabel];
    }
    model.actionAdd(inputData, function(err, data){
      if (err) {
        return callback(false);
      }
      return callback(true);
    });
  },
  actionRead:function(req, res){
    const inputData = [req.query.userID, req.query.subjectID, req.query.subjectLabel, req.query.actionLabel];
    model.actionRead(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      if (data[0].length == 0) {
        res.json({
             result: false
        });
      }
      else {
        res.json({
             result: true
        });
      }
    });
  },
  actionReadByInput:function(userID, subjectLabel, subjectID, actionLabel, callback) {
    const inputData = [userID, subjectID, subjectLabel, actionLabel];
    model.actionRead(inputData, function(err, data){
      if (err) {
        return callback(false);
      }
      console.log(data);
      if (data[0].length == 0) {
        return callback(true);
      }
      else {
        return callback(false);
      }
    });
  },
  actionDelete:function(req, res){
    // check if the api requester is accessing its own data and not others.
    if (req.query.userID != req.userID) {
      errorFactory.errorHandler(res, 401, "Access Denied.", null);
      return;
    }
    const inputData = [req.query.userID, req.query.subjectID, req.query.subjectLabel, req.query.actionLabel];
    model.actionDelete(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.json({
           result: "action deleted."
      });
    });
  }
}
