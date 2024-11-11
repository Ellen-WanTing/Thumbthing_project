const model = require('../models/category');
const errorFactory = require('../util/errorFactory');

module.exports={
  categoryAdd:function(req, res){
    const inputData = [req.body.catName, req.body.parentCatID];
    model.categoryAdd(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(201);
      res.json(data[0]);
    });
  },
  categoryView,
  categoryReadAll,
  categoryReadByID,
  categoryReadRange,
  categoryRead:function(req, res) {
    if (!req.query.categoryID) {
      if (!req.query.offset && !req.query.limit) {
        categoryReadAll(req, res);
      }
      else if (req.query.offset && req.query.limit){
        categoryReadRange(req, res);
      }
      else {
        errorFactory.errorHandler(res, 400, "Input Error: Parameters are not defined.", null);
      }
    }
    else {
      categoryReadByID(req, res);
    }
  },
  categoryReadByParent:function(req, res){
    const inputData = [req.params.id];
    model.categoryReadByParent(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.end(JSON.stringify(data[0]));
    });
  },
  categoryUpdate:function(req, res){
    const inputData = [req.params.id, req.body.parentCatID, req.body.catName];
    model.categoryUpdate(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.json(req.body);
    });//
  },
  categoryDelete:function(req, res){
    const inputData = [req.params.id];
    model.categoryDelete(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.json("{deleted_id:"+req.params.id+"}");
    });
  }
}

function categoryReadAll(req, res){
  model.categoryReadAll(function(err, data){
    if (err) {
      errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
      return;
    }
    res.status(200);
    res.end(JSON.stringify(data[0]));
  });
}

function categoryReadByID(req, res){
  const inputData = [req.query.categoryID];
  console.log(inputData);
  model.categoryReadByID(inputData, function(err, data){
    if (err) {
      errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
      return;
    }
    categoryView(req.query.categoryID);
    res.status(200);
    res.end(JSON.stringify(data[0]));
  });
}

function categoryReadRange(req, res){
  const inputData = [req.query.offset, req.query.limit];
  console.log(inputData);
  model.categoryReadRange(inputData, function(err, data){
    if (err) {
      errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
      return;
    }
    res.status(200);
    res.end(JSON.stringify(data[0]));
  });
}

function categoryView(catID) {
  const inputData = [catID];
  model.categoryView(inputData, function(err, data){

  });
}
