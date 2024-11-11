var express = require('express');
var bookmarkController=require('../controllers/bookmark');
var router = express.Router();
const CheckToken = require('../util/verifyToken');
// to add bookmark to tables
router.post('/bookmark', CheckToken.checkToken, CheckToken.userOnly, bookmarkController.bookmarkAdd);
router.get('/bookmark', CheckToken.checkToken, CheckToken.userOnly, bookmarkController.bookmarkRead);
router.delete('/bookmark', CheckToken.checkToken, CheckToken.userOnly, bookmarkController.bookmarkDelete);

module.exports = router;
