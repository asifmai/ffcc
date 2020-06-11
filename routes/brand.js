const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");
const auth = require("../helpers/auth");

/* GET - Show Sign in Page */
router.get("/", brandController.index_get);

module.exports = router;
