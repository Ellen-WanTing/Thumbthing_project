const model = require('../models/publisher');
const errorFactory = require('../util/errorFactory');

module.exports={
  publisherAdd:function(req, res){
    const inputData = [req.body.publisherName];
    model.publisherAdd(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(201);
      res.json(data[0]);
    });
  },
  publisherView,
  publisherReadAll,
  publisherReadRange,
  publisherRead:function(req, res){
    if (!req.query.offset && !req.query.limit) {
      publisherReadAll(req, res);
    }
    else if (req.query.offset && req.query.limit){
      publisherReadRange(req, res);
    }
    else {
      errorFactory.errorHandler(res, 400, "Input Error: Parameters are not defined.", null);
    }
  },
  publisherReadAllWithBooks:function(req, res){
    model.publisherReadAllWithBooks(function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.end(JSON.stringify(data[0]));
    });
  },
  publisherReadSpecific:function(req, res){
    const inputData = [req.params.id];
    model.publisherReadSpecific(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      publisherView(req.params.id);
      res.status(200);
      res.end(JSON.stringify(data[0]));
    });
  },
  publisherUpdate:function(req, res){
    const inputData = [req.params.id, req.body.publisherName];
    model.publisherUpdate(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.json(req.body);
    });//
  },
  publisherDelete:function(req, res){
    const inputData = [req.params.id];
    model.publisherDelete(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.json("{deleted_id:"+req.params.id+"}");
    });
  }
}

function publisherReadAll(req, res){
  model.publisherReadAll(function(err, data){
    if (err) {
      errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
      return;
    }
    res.status(200);
    res.end(JSON.stringify(data[0]));
  });
}

function publisherReadRange(req, res){
  const inputData = [req.query.offset, req.query.limit];
  model.publisherReadRange(inputData, function(err, data){
    if (err) {
      errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
      return;
    }
    res.status(200);
    res.end(JSON.stringify(data[0]));
  });
}

function publisherView(publisherID) {
  const inputData = [publisherID];
  model.publisherView(inputData, function(err, data){

  });
}
