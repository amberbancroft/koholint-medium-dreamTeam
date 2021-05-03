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
    .withMessage("Username must not be more than 50 characters long"),
  check("email")
    .exists({checkFalsy: true})
    .withMessage("Email cannot be empty")
    .isLength({max: 255})
    .withMessage("Email must not be more than 255 characters long")
    .custom((value) => {
      return db.User.findOne({ where: {email: value }}).then(user => {
        if(user) return Promise.reject("The provided Email is already in use by another account")
      });
    }),
  check("firstName")
    .exists({checkFalsy: true})
    .withMessage("First Name cannot be empty")
    .length({max: 50})
    .withMessage("First Name must not be more than 50 characters long"),
  check("lastName")
    .exists({checkFalsy: true})
    .withMessage("Last Name must cannot be empty")
    .length({max: 50})
    .withMessage("Last Name must not be more then 50 characters long"),
  check("password")
    .exists({checkFalsy: true})
    .withMessage("Password cannot be empty"),
  check("confirmPassword")
    .exists({checkFalsy: true})
    .withMessage("Confirm Password cannot be empty")
    .custom((value, { req }) => {
      if(value !== req.body.password) {
        throw new Error("Confirm Password does not match Password")
      }
      return true;
    }),
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
  userValidators,
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
