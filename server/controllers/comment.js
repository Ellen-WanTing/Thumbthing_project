const model = require('../models/comment');
const errorFactory = require('../util/errorFactory');
const actionController=require('../controllers/action');

module.exports={
  commentAdd:function(req, res){
    if (req.body.userID != req.userID) {
      errorFactory.errorHandler(res, 401, "Access Denied.", null);
      return;
    }
    const inputData = [req.body.userID, req.body.summaryID, req.body.comment];
    model.commentAdd(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(201);
      res.json(data[0]);
    });
  },
  commentRead:function(req, res){
    const inputData = [req.query.summaryID];
    model.commentRead(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.end(JSON.stringify(data[0]));
    });
  },
  commentReadByID:function(req, res){
    const inputData = [req.params.id];
    model.commentReadByID(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.end(JSON.stringify(data[0]));
    });
  },
  commentUpdate:function(req, res){
    const inputData = [req.params.id, req.body.comment];
    model.commentReadByID(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      if (data[0][0].UserID == req.userID) {
        model.commentUpdate(inputData, function(err, data){
          if (err) {
            errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
            return;
          }
          res.status(200);
          res.json(req.body);
        });
      }
      else {
        errorFactory.errorHandler(res, 401, "Access Denied.", null);
        return;
      }
    });
  },
  commentDelete:function(req, res){
    const inputData = [req.params.id];
    model.commentReadByID(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      if (data[0][0].UserID == req.userID) {
        model.commentDelete(inputData, function(err, data){
          if (err) {
            errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
            return;
          }
          res.status(200);
          res.json("{deleted_id:"+req.params.id+"}");
        });
      }
      else {
        errorFactory.errorHandler(res, 401, "Access Denied.", null);
        return;
      }
    });
  },
  commentReport:function(req, res){
    const inputData = [req.params.id];
    actionController.actionReadByInput(req.userID, "Comment", req.params.id, "report", function(result){
      if (result) {
        model.commentReport(inputData, function(err, data){
          if (err) {
            errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
            return;
          }
          actionController.actionAddByInput(req.userID, "Comment", req.params.id, "report", function(result){
            res.status(200);
            res.json("{comment_id:"+req.params.id+"}");
          });
        });
      }
      else {
        errorFactory.errorHandler(res, 401, "You have already reported this comment.", null);
      }
    });
  }
}
