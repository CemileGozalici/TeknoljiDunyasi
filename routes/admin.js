const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/contents', adminController.getContents);

router.get('/add-content', adminController.getAddContent);

router.post('/add-content', adminController.postAddContent);

router.get('/contents/:contentid', adminController.getEditContent);

router.post('/contents', adminController.postEditContent);

router.post('/delete-content', adminController.postDeleteContent);

module.exports = router;