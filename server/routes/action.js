var express = require('express');
var actionController=require('../controllers/action');
var router = express.Router();
const CheckToken = require('../util/verifyToken');
// to add action to tables
router.post('/action', CheckToken.checkToken, CheckToken.userOnly, actionController.actionAdd);
router.get('/action', actionController.actionRead);
router.delete('/action', CheckToken.checkToken, CheckToken.userOnly, actionController.actionDelete);

module.exports = router;
