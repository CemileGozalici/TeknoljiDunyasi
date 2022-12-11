const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/authentication');

const adminController = require('../controllers/admin');

const csrf=require('../middleware/csrf');

router.get('/contents',csrf,isAuthenticated, adminController.getContents);

router.get('/add-content',csrf,isAuthenticated, adminController.getAddContent);

router.post('/add-content',csrf,isAuthenticated, adminController.postAddContent);

router.get('/contents/:contentid',csrf,isAuthenticated, adminController.getEditContent);

router.post('/contents',csrf,isAuthenticated, adminController.postEditContent);

router.post('/delete-content',csrf,isAuthenticated, adminController.postDeleteContent);

router.get('/add-category',csrf,isAuthenticated, adminController.getAddCategory);

router.post('/add-category',csrf,isAuthenticated, adminController.postAddCategory);

router.get('/categories',csrf,isAuthenticated, adminController.getCategories);

router.get('/categories/:categoryid',csrf,isAuthenticated, adminController.getEditCategory);

router.post('/categories',csrf,isAuthenticated, adminController.postEditCategory);

router.post('/delete-category',csrf,isAuthenticated, adminController.postDeleteCategory);

module.exports = router;   