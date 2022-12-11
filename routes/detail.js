const express = require('express');
const router = express.Router();

const csrf=require('../middleware/csrf');
const detailController = require('../controllers/detail');


router.get('/', csrf, detailController.getIndex);

router.get('/contents', csrf,detailController.getContents);

router.get('/contents/:contentid', csrf, detailController.getContent);

router.get('/categories/:categoryid', csrf,detailController.getContentsByCategoryId);


module.exports = router;