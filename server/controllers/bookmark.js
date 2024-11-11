const model = require('../models/bookmark');
const errorFactory = require('../util/errorFactory');

module.exports={
  bookmarkAdd:function(req, res){
    if (req.body.userID != req.userID) {
      errorFactory.errorHandler(res, 401, "Access Denied.", null);
      return;
    }
    const inputData = [req.body.userID, req.body.bookID];
    model.bookmarkAdd(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(201);
      res.json(data[0]);
    });
  },
  bookmarkRead:function(req, res){
    const inputData = [req.query.userID];
    model.bookmarkRead(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.end(JSON.stringify(data[0]));
    });
  },
  bookmarkDelete:function(req, res){
    if (req.query.userID != req.userID) {
      errorFactory.errorHandler(res, 401, "Access Denied.", null);
      return;
    }
    const inputData = [req.query.userID, req.query.bookID];
    model.bookmarkDelete(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.json("{deleted_id:"+req.params.id+"}");
    });
  }
}
