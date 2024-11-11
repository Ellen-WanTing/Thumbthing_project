var express = require('express');
var userController=require('../controllers/user');
const CheckToken = require('../util/verifyToken');
var router = express.Router();


router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.get('/users/all', CheckToken.checkToken, CheckToken.adminOnly, userController.getAllUser);
router.get('/users/role', CheckToken.checkToken, CheckToken.adminOnly, userController.getUserbyRole);
router.get('/users/:UserID', CheckToken.checkToken, CheckToken.userOnly, userController.getUserbyUserID);
router.put('/edit', CheckToken.checkToken, CheckToken.userOnly, userController.editUser);
router.delete('/users/:UserID', CheckToken.checkToken, CheckToken.userOnly, userController.deleteUser);
//check for access
router.get('/adminOnly', CheckToken.checkToken, CheckToken.adminOnly, userController.adminonly);
//check for access
router.get('/userOnly', CheckToken.checkToken, CheckToken.userOnly, userController.Useronly);

module.exports = router;
