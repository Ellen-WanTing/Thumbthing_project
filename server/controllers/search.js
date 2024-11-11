const model = require('../models/search');
const errorFactory = require('../util/errorFactory');

module.exports={
  searchBook:function(req, res){
    if (req.query.keyword) {
      const inputData = [req.query.keyword,
        (req.query.activeCat) ? (req.query.activeCat === 'true'):false,
        (req.query.activeAuthor) ? (req.query.activeAuthor === 'true'):false,
        (req.query.activePublisher) ? (req.query.activePublisher === 'true'):false,
        true,
        true,
        (req.query.activeAuthorOrder) ? (req.query.activeAuthorOrder === 'true'):false,
        (req.query.activePublisherOrder) ? (req.query.activePublisherOrder === 'true'):false,
        (req.query.offset) ? req.query.offset:-1,
        (req.query.limit) ? req.query.limit:-1];
      model.searchBook(inputData, function(err, data){
        if (err) {
          errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
          return;
        }
        res.status(201);
        res.json(data[0]);
      });
    } else {
      errorFactory.errorHandler(res, 400, "Input Error: Parameters are not defined.", null);
    }
  },
  searchSummary:function(req, res){
    if (req.query.keyword) {
      const inputData = [req.query.keyword,
        (req.query.offset) ? req.query.offset:-1,
        (req.query.limit) ? req.query.limit:-1];
      model.searchSummary(inputData, function(err, data){
        if (err) {
          errorFactory.errorHandler(res, 500, "MySQL Error: Can not retrieve data.", err);
          return;
        }
        res.status(201);
        res.json(data[0]);
      });
    } else {
      errorFactory.errorHandler(res, 400, "Input Error: Parameters are not defined.", null);
    }
  }
}
