const model = require('../models/summary');
const errorFactory = require('../util/errorFactory');
const actionController=require('../controllers/action');

module.exports={
  summaryAdd:function(req, res){
    if (req.body.userID != req.userID) {
      errorFactory.errorHandler(res, 401, "Access Denied.", null);
      return;
    }
    const inputData = [req.body.userID, req.body.bookID, req.body.summary];
    console.log(inputData,req.body)
    model.summaryAdd(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(201);
      res.json(data[0]);
    });//
  },
  summaryReadByBook,
  summaryReadByUser,
  summaryRead:function(req, res){
    if (req.query.bookID) {
      summaryReadByBook(req, res);
    }
    else if (req.query.userID) {
      summaryReadByUser(req, res);
    }
    //sahil's code
    else if (req.query.summaryID){
      const inputData = [req.query.summaryID];

      model.summaryReadById(inputData, function(err, data){
        if (err) {
          errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
          return;
        }
        res.status(200);
        res.end(JSON.stringify(data[0]));
      });
    }
    //sahil's code end
    else {
      errorFactory.errorHandler(res, 400, "Must provid filter.");
    }
  },
  summaryReadByID:function(req, res){
    const inputData = [req.params.id];
    model.summaryReadByID(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.json(data[0]);
    });
  },
  summaryUpdate:function(req, res){
    const inputData = [req.params.id, req.body.summary];
    model.summaryReadByID(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      if (data[0][0].UserID == req.userID) {
        model.summaryUpdate(inputData, function(err, data){
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
  summaryDelete:function(req, res){
    const inputData = [req.params.id];
    model.summaryReadByID(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      if (data[0][0].UserID == req.userID) {
        model.summaryDelete(inputData, function(err, data){
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
  summaryLike:function(req, res){
    const inputData = [req.params.id];
    actionController.actionReadByInput(req.userID, "Summary", req.params.id, "like", function(result){
      if (result) {
        model.summaryLike(inputData, function(err, data){
          if (err) {
            errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
            return;
          }
          actionController.actionAddByInput(req.userID, "Summary", req.params.id, "like", function(result){
            res.status(200);
            res.json("{summary_id:"+req.params.id+"}");
          });
        });
      }
      else {
        errorFactory.errorHandler(res, 401, "You have already liked this summary.", null);
      }
    });
  },
  summaryReport:function(req, res){
    const inputData = [req.params.id];
    actionController.actionReadByInput(req.userID, "Summary", req.params.id, "report", function(result){
      if (result) {
        model.summaryReport(inputData, function(err, data){
          if (err) {
            errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
            return;
          }
          actionController.actionAddByInput(req.userID, "Summary", req.params.id, "report", function(result){
            res.status(200);
            res.json("{summary_id:"+req.params.id+"}");
          });
        });
      }
      else {
        errorFactory.errorHandler(res, 401, "You have already reported this summary.", null);
      }
    });
  }
}

function summaryReadByBook(req, res){
  const inputData = [req.query.bookID];
  model.summaryReadByBook(inputData, function(err, data){
    if (err) {
      errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
      return;
    }
    res.status(200);
    res.end(JSON.stringify(data[0]));
  });
}

function summaryReadByUser(req, res){
  const inputData = [req.query.userID];
  model.summaryReadByUser(inputData, function(err, data){
    if (err) {
      errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
      return;
    }
    res.status(200);
    res.end(JSON.stringify(data[0]));
  });
}
