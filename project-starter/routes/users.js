//Imports
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const bcrypt = require("bcryptjs");
const { csrfProtection, asyncHandler } = require("./utils");
const { loginUser, logoutUser } = require("../auth");

const userValidators = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Username cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Username must not be more than 50 characters long"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Email cannot be empty")
    .isLength({ max: 255 })
    .withMessage("Email must not be more than 255 characters long")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user)
          return Promise.reject(
            "The provided Email is already in use by another account"
          );
      });
    }),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name cannot be empty")
    .isLength({ max: 50 })
    .withMessage("First Name must not be more than 50 characters long"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name must cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Last Name must not be more then 50 characters long"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password cannot be empty"),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Confirm Password cannot be empty")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),
];

const loginvalidators = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Username cannot be empty"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password cannot be empty")
]

/* GET users listing. */
router.get(
  "/signup",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    res.render("user-signup", {
      title: "Sign Up",
      csrfToken: req.csrfToken(),
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
      hashedPassword,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await newUser.save();
      loginUser(req, res, newUser); //add session login
      req.session.save(() => res.redirect("/")) //res.redirect("/");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("user-signup", {
        title: "Sign Up",
        csrfToken: req.csrfToken(),
        errors,
        userName: userName,
        email: email,
        firstName: firstName,
        lastName: lastName,
      });
    }
  })
);

router.get('/login', csrfProtection, (req,res) => {
  res.render('user-login', {
    title: "Login",
    csrfToken: req.csrfToken(),
  })
})

router.post("/login", csrfProtection, loginvalidators, asyncHandler(async(req, res) => {
  const {userName, password} = req.body;
  let errors = [];
  const validatorErrors = validationResult(req);
  if (validatorErrors.isEmpty()) {
    const user = await db.User.findOne({where: {userName}});
    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
      if (passwordMatch) {
        loginUser(req,res,user);
        return req.session.save(() => res.redirect("/")) //return res.redirect('/');
      }
    } 
    errors.push("Invalid password, please try again.")
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }
  res.render('user-login', {
    title: "Login",
    errors,
    csrfToken: req.csrfToken(),
  });
}));



router.get('/logout', (req, res) => {
  logoutUser(req,res);
  req.session.save(() => res.redirect("/")) //res.redirect('/');
});

//Exports
module.exports = router;
