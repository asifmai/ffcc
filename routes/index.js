const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexcontroller");
const auth = require("../helpers/auth");

/* GET - Private - home page */
router.get(
  "/",
  auth.ensureAuthenticated,
  auth.ensureVerified,
  auth.ensureUser,
  indexController.index_get
);

/* GET - Private - Track page */
router.get(
  "/track/:id",
  auth.ensureAuthenticated,
  auth.ensureVerified,
  auth.ensureUser,
  indexController.track_get
);

/* GET - Private - Track page */
router.get(
  "/search",
  auth.ensureAuthenticated,
  auth.ensureVerified,
  auth.ensureUser,
  indexController.search_get
);

// POST - Private - Download Data
router.post(
  "/downloadcsv",
  auth.ensureAuthenticated,
  auth.ensureVerified,
  auth.ensureUser,
  indexController.downloadcsv_post
);

// GET - Private - Mail Shipment Details
router.get(
  "/mailshipment/:id",
  auth.ensureAuthenticated,
  auth.ensureVerified,
  auth.ensureUser,
  indexController.mailshipment_get
);

/* GET - Show Sign in Page */
router.get("/signin", indexController.signin_get);

/* POST - Show Sign in Page */
router.post("/signin", indexController.signin_post);

/* GET - Show Sign in Page */
router.get("/signup", indexController.signup_get);

/* POST - Signup user */
router.post("/signup", indexController.signup_post);

/* GET - Signup user */
router.get("/signout", auth.ensureAuthenticated, indexController.signout_get);

/* GET - Show verification page */
router.get("/verify/:userid", indexController.verify_get);

/* POST - Verify the account */
router.post("/verify", indexController.verify_post);

module.exports = router;
