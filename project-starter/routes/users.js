//Imports
const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require("../db/models");
const bcrypt = require("bcryptjs");
const { csrfProtection, asyncHandler } = require("./utils");

const userValidators = [
  check("userName")
    .exists({checkFalsy: true})
    .withMessage("Username cannot be empty")
    .isLength({max: 50})
    .withMessage("Username must not be more than 50 characters long");
]


/* GET users listing. */
router.get(
  "/signup",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    res.render("user-signup", {
      title: "Sign Up",
      crsfToken: req.csrfToken()
    });
  })
);

router.post(
  "/signup",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const { email, firstName, lastName, userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.build({
      userName,
      email,
      firstName,
      lastName,
      hashedPassword
    })
  })
);

//Exports
module.exports = router;
