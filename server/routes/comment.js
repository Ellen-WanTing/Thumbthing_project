var express = require('express');
var commentController=require('../controllers/comment');
var router = express.Router();
const CheckToken = require('../util/verifyToken');
// to add comment to tables
router.post('/comment', CheckToken.checkToken, CheckToken.userOnly, commentController.commentAdd);
router.get('/comment', commentController.commentRead);
router.get('/comment/:id', commentController.commentReadByID);
router.put('/comment/:id', CheckToken.checkToken, CheckToken.userOnly, commentController.commentUpdate);
router.put('/comment/report/:id', CheckToken.checkToken, CheckToken.userOnly, commentController.commentReport);
router.delete('/comment/:id', CheckToken.checkToken, CheckToken.userOnly, commentController.commentDelete);

module.exports = router;
