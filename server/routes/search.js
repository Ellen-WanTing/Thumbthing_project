var express = require('express');
var searchController=require('../controllers/search');
var router = express.Router();
// to add search to tables
router.get('/search/books', searchController.searchBook);
router.get('/search/summary', searchController.searchSummary);

module.exports = router;
