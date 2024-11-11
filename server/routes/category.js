var express = require('express');
var categoryController=require('../controllers/category');
var router = express.Router();
const CheckToken = require('../util/verifyToken');
// to add category to tables
router.post('/category', CheckToken.checkToken, CheckToken.adminOnly, categoryController.categoryAdd);
router.get('/category', categoryController.categoryRead);
router.get('/category/:id', categoryController.categoryReadByParent);
router.put('/category/:id', CheckToken.checkToken, CheckToken.adminOnly, categoryController.categoryUpdate);
router.delete('/category/:id', CheckToken.checkToken, CheckToken.adminOnly, categoryController.categoryDelete);

module.exports = router;
