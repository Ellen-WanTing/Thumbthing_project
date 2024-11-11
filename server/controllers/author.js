const model = require('../models/author');
const errorFactory = require('../util/errorFactory');

module.exports={
  authorAdd:function(req, res){
    const inputData = [req.body.authorName];
    model.authorAdd(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(201);
      res.json(data[0]);
    });
  },
  authorView,
  authorReadAll,
  authorReadRange,
  authorRead:function(req, res){
    if (!req.query.offset && !req.query.limit) {
      authorReadAll(req, res);
    }
    else if (req.query.offset && req.query.limit){
      authorReadRange(req, res);
    }
    else {
      errorFactory.errorHandler(res, 400, "Input Error: Parameters are not defined.", null);
    }
  },
  authorReadAllWithBooks:function(req, res){
    model.authorReadAllWithBooks(function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.end(JSON.stringify(data[0]));
    });
  },
  authorReadSpecific:function(req, res){
    const inputData = [req.params.id];
    model.authorReadSpecific(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      authorView(req.params.id);
      res.status(200);
      res.end(JSON.stringify(data[0]));
    });
  },
  authorUpdate:function(req, res){
    const inputData = [req.params.id, req.body.authorName];
    model.authorUpdate(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.json(req.body);
    });//
  },
  authorDelete:function(req, res){
    const inputData = [req.params.id];
    model.authorDelete(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.json("{deleted_id:"+req.params.id+"}");
    });
  }
}

function authorReadAll(req, res){
  model.authorReadAll(function(err, data){
    if (err) {
      errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
      return;
    }
    res.status(200);
    res.json(data[0]);
  });
}

function authorReadRange(req, res){
  const inputData = [req.query.offset, req.query.limit];
  model.authorRead(inputData, function(err, data){
    if (err) {
      errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
      return;
    }
    res.status(200);
    res.end(JSON.stringify(data[0]));
  });
}

function authorView(authorID) {
  const inputData = [authorID];
  model.authorView(inputData, function(err, data){

  });
}
