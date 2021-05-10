//Imports
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const bcrypt = require("bcryptjs");
const { csrfProtection, asyncHandler } = require("./utils");
const { loginUser, logoutUser } = require("../auth");

//Validators
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

//Routes
//SignUp
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

//Login
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
//Demo Login - API route that can only be requested via Demo button
router.get("/demo", asyncHandler(async(req,res) => {
  const demoUser = await db.User.findByPk(1);
  loginUser(req, res, demoUser);
  req.session.save(() => res.redirect("/"))
}))


//Logout
router.get('/logout', (req, res) => {
  logoutUser(req,res);
  req.session.save(() => res.redirect("/")) //res.redirect('/');
});

//User Profile Page
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    //variable declarations
    const userId = parseInt(req.params.id,10);
    const currentUser = await db.User.findByPk(userId, {
      include: {
        model: db.Follow,
        as: 'followed'
      }
    });
    let boolean = false;
    let loggedIn = false;

    //if defined
    if(req.session.auth) {
      boolean = userId === req.session.auth.userId;
      loggedIn = true;
      //Check to see if you are following this user
      let followers = currentUser.followed;
      for(let follower of followers){
        if(follower.followerId === req.session.auth.userId){
          currentUser.following = true;
        }
      }
    }

    //Rendering followers
    const followedId = userId;
    const followers = await db.Follow.findAll({
      where: {
        followedId
      },
      include: {
        model: db.User,
        as: 'followers'
      }
  
    });

    const followerId = userId;
    const following = await db.Follow.findAll({
      where: {
        followerId
      },
      include: {
        model: db.User,
        as: 'followed'
      }
  
    });
  
    countOfFollowers = followers.length;
    countOfUsersFollowing = following.length;

    res.render("user-profile-page", {
      title: "Profile Page",
      currentUser,
      boolean,
      pageId: userId,
      loggedIn,
      followers,
      following
    });
  })
);

router.get(
  "/:id(\\d+)/edit",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    //variable declarations
    const userId = parseInt(req.params.id,10);
    const currentUser = await db.User.findByPk(userId);
    let boolean = false;

    //if defined
    if(req.session.auth) {
      boolean = userId === req.session.auth.userId;
    }
console.log("AM I FOLLOWING THIS PERSON???", currentUser.following);
    res.render("user-profile-page-edit", {
      title: "Edit Profile Page",
      currentUser,
      csrfToken: req.csrfToken(),
      boolean,
      pageId: userId,
      // loggedIn,
    });
  })
);

router.patch(
  "/:id(\\d+)/edit",
  asyncHandler(async (req, res, next) => {
    //Variable Declaration
    const { imgUrl, bio } = req.body;
    const userId = parseInt(req.params.id,10);
    const currentUser = await db.User.findByPk(userId);

    await currentUser.update({
      imgUrl,
      bio
    });

    await currentUser.save();

    res.json({userId});
  })
);


router.patch('/:id(\\d+)', asyncHandler(async(req, res) => {
  const userId = parseInt(req.params.id,10);
  const followerId = req.session.auth.userId;
  const followedId = userId;
  const currentUser = await db.User.findByPk(userId);
  let boolean = false; //logged in and on same page

    //if defined
    if (req.session.auth) {
      boolean = userId === req.session.auth.userId;
    }

    if (followerId !== userId) {
      await db.Follow.create({
        followerId,
        followedId,
      })
    }

  res.render('user-profile-page', {
    userId,
    currentUser,
    boolean,
  })

}))


router.delete('/:id(\\d+)', asyncHandler(async(req, res) => {
  const userId = parseInt(req.params.id,10);
  const followerId = req.session.auth.userId;
  const followedId = userId;
  const currentUser = await db.User.findByPk(userId);
  let boolean = false;

    //if defined
    if(req.session.auth) {
      boolean = userId === req.session.auth.userId;
    }

  await db.Follow.destroy({
    where: {
      followerId,
      followedId
    }
  })
  res.render('user-profile-page', {
    userId,
    currentUser,
    boolean,
  })

}))

router.get('/:id(\\d+)/followers', asyncHandler(async(req, res) => {
  const userId = parseInt(req.params.id,10);
  const followedId = userId;
  const followers = await db.Follow.findAll({
    where: {
      followedId
    },
    include: {
      model: db.User,
      as: 'followers'
    }

  });

  countOfFollowers = followers.length;
  console.log('Count', countOfFollowers);
  console.log('followwweeeerrssss',followers);
  res.render('followers', {
    followers
  })
}));

router.get('/:id(\\d+)/following', asyncHandler(async(req, res) => {
  const userId = parseInt(req.params.id,10);
  const followerId = userId;
  const following = await db.Follow.findAll({
    where: {
      followerId
    },
    include: {
      model: db.User,
      as: 'followed'
    }

  });

  countOfUsersFollowing = following.length;
  console.log('Count', countOfUsersFollowing);
  console.log('following********', following)

  res.render('followed', {
    following
  })
}));

//Exports
module.exports = router;
