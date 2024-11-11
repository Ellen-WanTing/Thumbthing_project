var express = require('express');
var authorController=require('../controllers/author');
var router = express.Router();
const CheckToken = require('../util/verifyToken');
// to add author to tables
router.post('/author', CheckToken.checkToken, CheckToken.adminOnly, authorController.authorAdd);
router.get('/author', authorController.authorRead);
router.get('/author/books', authorController.authorReadAllWithBooks);
router.get('/author/:id', authorController.authorReadSpecific);
router.put('/author/:id', CheckToken.checkToken, CheckToken.adminOnly, authorController.authorUpdate);
router.delete('/author/:id', CheckToken.checkToken, CheckToken.adminOnly, authorController.authorDelete);

module.exports = router;
