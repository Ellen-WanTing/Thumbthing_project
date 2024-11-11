var express = require('express');
var summaryController=require('../controllers/summary');
var router = express.Router();
const CheckToken = require('../util/verifyToken');
// to add summary to tables
router.post('/summary', CheckToken.checkToken, CheckToken.userOnly, summaryController.summaryAdd);
router.get('/summary', summaryController.summaryRead);
router.get('/summary/:id', summaryController.summaryReadByID);
router.put('/summary/:id', CheckToken.checkToken, CheckToken.userOnly, summaryController.summaryUpdate);
router.put('/summary/like/:id', CheckToken.checkToken, CheckToken.userOnly, summaryController.summaryLike);
router.put('/summary/report/:id', CheckToken.checkToken, CheckToken.userOnly, summaryController.summaryReport);
router.delete('/summary/:id', CheckToken.checkToken, CheckToken.userOnly, summaryController.summaryDelete);

module.exports = router;
