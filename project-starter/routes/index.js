//Imports
const express = require("express");
const { csrfProtection, asyncHandler} = require("./utils");
const db = require("../db/models");
const { validationResult, check } = require("express-validator");
const router = express.Router();

const getTenStories = async () => {
  const allStories = await db.Story.findAll();
  return allStories.slice(0,10);
}

/* GET home page. */
router.get("/", asyncHandler(async (req, res, next) => {
  const storiesToRender = await getTenStories();
  const firstSixStories = storiesToRender.slice(0,6);
  const lastFourStories = storiesToRender.slice(6);
  res.render("index", {
    title: "Home",
    authenticated: res.locals.authenticated,
    topStories: firstSixStories,
    otherStories: lastFourStories
  });
}));

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
  const id = req.params.id
  const story = await db.Story.findOne(
      {where: {id}}
  );
  const user = await db.User.findOne( {where: story.userId});
  res.render('individual-stories', {
    csrfToken: req.csrfToken(),
    story,
    user,
  })
}));

const storyValidator =[
  check('title')
      .exists({checkFalsy: true})
      .withMessage("Title cannot be empty")
      .custom((value)=>{
          return db.Story.findOne({ where: {title:value}}).then((title)=>{
              if (title)
                  return Promise.reject("This title already exists");
          })
      }),
  check('content')
      .exists({checkFalsy: true})
      .withMessage("Story cannot be empty")
      .custom((value)=>{
          return db.Story.findOne({ where: {content:value}}).then((story)=>{
              if (story)
                  return Promise.reject("This story already exists");
          })
      })
]

router.get('/:id(\\d+)/edit', csrfProtection, asyncHandler(async(req, res) => {
  const id = req.params.id
  const story = await db.Story.findOne({
    where: {id}
  })
  res.render('edit-story', {
    csrfToken: req.csrfToken(),
    story,
    title: 'Edit Story',
  })
}))

router.post('/:id(\\d+)/edit', csrfProtection, asyncHandler(async(req, res) => {
  const id = req.params.id
  const storyToUpdate = await db.Story.findOne({
    where: {id}
  });
  
  const {
    title,
    content,
  } = req.body;

  const story = {
    title,
    content,
  }

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    await storyToUpdate.update(story);
    res.redirect('/stories');
  } else {
    const errors = validatorErrors.array().map((error) => error.msg)
    res.render('edit-story', {
      csrfToken: req.csrfToken(),
      errors,
      title: 'Edit Story',
    })
  }
}));

//Exports
module.exports = router;
