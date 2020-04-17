const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexcontroller');
const auth = require('../helpers/auth');

/* GET - Public - home page */
router.get('/', auth.ensureAuthenticated, indexController.index_get);

/* GET - Show Sign in Page */
router.get('/signin', auth.ensureAuthenticatedLogin, indexController.signin_get);

/* POST - Show Sign in Page */
router.post('/signin', indexController.signin_post);

/* GET - Show Sign in Page */
router.get('/signup', indexController.signup_get);

/* POST - Signup user */
router.post('/signup', indexController.signup_post);

/* GET - Signup user */
router.get('/signout', indexController.signout_get);

/* GET - Show verification page */
router.get('/verify/:userid', indexController.verify_get);

/* POST - Verify the account */
router.post('/verify', indexController.verify_post);

module.exports = router;
