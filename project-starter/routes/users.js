//Imports
const express = require("express");
const router = express.Router();
const db = require("../db/models");
const bcrypt = require("bcryptjs");
const { csrfProtection, asyncHandler } = require("./utils");

/* GET users listing. */
router.get(
  "/signup",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    res.send("respond with a resource");
  })
);

router.post(
  "/signup",
  csrfProtection,
  asyncHandler(async (req, res, next) => {})
);

//Exports
module.exports = router;
