const model = require('../models/book');
const actionController=require('../controllers/action');
const errorFactory = require('../util/errorFactory');

module.exports={
  bookAddByName,
  bookAddByID,
  bookAdd:function(req, res) {
    if (req.params.type == "Name") {
      bookAddByName(req, res);
    }
    else if (req.params.type == "ID"){
      bookAddByID(req, res);
    }
    else {
      errorFactory.errorHandler(res, 400, "Input Error: Parameters are not defined.", null);
    }
  },
  bookView,
  addViewNumber,
  bookReadAll,
  bookReadByFilter,
  bookReadRange,
  bookRead:function(req, res){
    if (!req.query.categoryID && !req.query.authorID && !req.query.publisherID) {
      if (!req.query.offset && !req.query.limit) {
        bookReadAll(req, res);
      }
      else if (req.query.offset && req.query.limit) {
        bookReadRange(req, res);
      }
      else {
        errorFactory.errorHandler(res, 400, "Input Error: Parameters are not defined.", null);
      }
    }
    else if (req.query.categoryID || req.query.authorID || req.query.publisherID){
      bookReadByFilter(req, res);
    }
    else {
      errorFactory.errorHandler(res, 400, "Input Error: Parameters are not defined.", null);
    }
  },
  bookReadSpecific:function(req, res){
    const inputData = [null, null, req.params.id, null, -1 ,-1];
    model.bookReadByFilter(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      addViewNumber(req.params.id, data[0][0].AuthorID, data[0][0].CategoryID, data[0][0].PublisherID);
      res.status(200);
      res.end(JSON.stringify(data[0]));
    });
  },
  bookUpdate:function(req, res){
    const inputData = [req.params.id, req.body.catID, req.body.authorID, req.body.title,
      req.body.yearOfPublication, req.body.rating, req.body.language,
      req.body.image, req.body.publisherID];
    model.bookUpdate(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.json(req.body);
    });//
  },
  bookDelete:function(req, res){
    const inputData = [req.params.id];
    model.bookDelete(inputData, function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.json("{deleted_id:"+req.params.id+"}");
    });
  },
  bookReadRandom:function(req, res){
    model.bookReadRandom(function(err, data){
      if (err) {
        errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
        return;
      }
      res.status(200);
      res.json(data[0]);
    });
  },
  bookRating:function(req, res){
    const inputData = [req.params.id, req.body.rating];
    actionController.actionReadByInput(req.userID, "Book", req.params.id, "rating", function(result){
      if (result) {
        model.bookRating(inputData, function(err, data){
          if (err) {
            errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
            return;
          }
          actionController.actionAddByInput(req.userID, "Book", req.params.id, "rating", function(result){

          });
          res.status(200);
          res.json("{Book_id:"+req.params.id+"}");
        });
      }
      else {
        errorFactory.errorHandler(res, 401, "You have already added your rating.", null);
      }
    });
  }
}

function bookAddByName(req, res){
  const inputData = [req.body.catName, req.body.authorName, req.body.title,
    req.body.yearOfPublication, req.body.rating, req.body.language,
    req.body.image, req.body.publisherName];
  model.bookAddByName(inputData, function(err, data){
    if (err) {
      errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
      return;
    }
    res.status(201);
    res.json(data[2]);
  });
}

function bookAddByID(req, res){
  const inputData = [req.body.catID, req.body.authorID, req.body.publisherID,
    req.body.title,req.body.yearOfPublication, req.body.rating, req.body.language,
    req.body.image];
  model.bookAddByID(inputData, function(err, data){
    if (err) {
      errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
      return;
    }
    res.status(201);
    res.json(data[0]);
  });
}

function bookReadAll(req, res){
  model.bookReadAll(function(err, data){
    if (err) {
      errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
      return;
    }
    res.status(200);
    res.end(JSON.stringify(data[0]));
  });
}

function bookReadByFilter(req, res){
  const inputData = [(req.query.categoryID) ? req.query.categoryID:null,
    (req.query.authorID) ? req.query.authorID:null,
    null,
    (req.query.publisherID) ? req.query.publisherID:null,
    (req.query.offset) ? req.query.offset:-1,
    (req.query.limit) ? req.query.limit:-1];
  model.bookReadByFilter(inputData, function(err, data){
    if (err) {
      errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
      return;
    }
    res.status(200);
    res.end(JSON.stringify(data[0]));
  });
}

function bookReadRange(req, res){
  const inputData = [req.query.offset, req.query.limit];
  model.bookReadRange(inputData, function(err, data){
    if (err) {
      errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
      return;
    }
    res.status(200);
    res.end(JSON.stringify(data[0]));
  });
}

function bookView(bookID) {
  const inputData = [bookID];
  model.bookView(inputData, function(err, data){

  });
}

function addViewNumber(bookID, authorID, categoryID, publisherID) {
  const inputData = [authorID, bookID, categoryID, publisherID];
  model.addViewNumber(inputData, function(err, data){

  });
}
