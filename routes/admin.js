const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');
const auth = require('../helpers/auth');

/* GET users listing. */
router.get('/', auth.ensureAuthenticatedAdmin, adminController.admin_get);

/* GET - Public - Show admin sign in page */
router.get('/signin', adminController.signin_get);

/* POST - Public - admin sign */
router.post('/signin', adminController.signin_post);

/* GET - Public - admin sign out */
router.get('/signout', auth.ensureAuthenticatedAdmin, adminController.signout_get);

/* GET - Public - Show Data Page */
router.get('/data', auth.ensureAuthenticatedAdmin, adminController.data_get);

/* GET - Public - Show Users Page */
router.get('/users', auth.ensureAuthenticatedAdmin, adminController.users_get);

/* GET - Public - Delete User */
router.get('/users/deleteuser/:userid', auth.ensureAuthenticatedAdmin, adminController.deleteuser_get);

// POST - Private - Upload File
router.post('/upload', auth.ensureAuthenticatedAdmin, adminController.upload_post)

// GET - Private - Upload File
router.get('/data/delete/:entryid', auth.ensureAuthenticatedAdmin, adminController.deleteentry_post)

module.exports = router;
