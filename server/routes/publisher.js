var express = require('express');
var publisherController=require('../controllers/publisher');
var router = express.Router();
const CheckToken = require('../util/verifyToken');
// to add publisher to tables
router.post('/publisher', CheckToken.checkToken, CheckToken.adminOnly, publisherController.publisherAdd);
router.get('/publisher', publisherController.publisherRead);
router.get('/publisher/books', publisherController.publisherReadAllWithBooks);
router.get('/publisher/:id', publisherController.publisherReadSpecific);
router.put('/publisher/:id', CheckToken.checkToken, CheckToken.adminOnly, publisherController.publisherUpdate);
router.delete('/publisher/:id', CheckToken.checkToken, CheckToken.adminOnly, publisherController.publisherDelete);

module.exports = router;
