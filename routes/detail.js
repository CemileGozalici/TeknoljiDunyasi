const express = require('express');
const router = express.Router();

const detailController = require('../controllers/detail');

router.get('/', detailController.getIndex);

router.get('/contents', detailController.getContents);

router.get('/contents/:contentid', detailController.getContent);

router.get('/categories/:categoryid', detailController.getContentsByCategoryId);

router.get('/details', detailController.getContentDetails);


module.exports = router;