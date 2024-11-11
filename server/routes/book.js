var express = require('express');
var bookController=require('../controllers/book');
var router = express.Router();
const CheckToken = require('../util/verifyToken');
// to add book to tables
router.post('/book/:type', CheckToken.checkToken, CheckToken.adminOnly, bookController.bookAdd);
router.get('/book', bookController.bookRead);
router.get('/book/popular', bookController.bookReadRandom);
router.get('/book/:id', bookController.bookReadSpecific);
router.put('/book/:id', CheckToken.checkToken, CheckToken.adminOnly, bookController.bookUpdate);
router.put('/book/rating/:id', CheckToken.checkToken, CheckToken.userOnly, bookController.bookRating);
router.delete('/book/:id', CheckToken.checkToken, CheckToken.adminOnly, bookController.bookDelete);

module.exports = router;
