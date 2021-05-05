//Imports
const express = require("express");
const { csrfProtection, asyncHandler} = require("./utils");
const db = require("../db/models");
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
  )
  res.render('individual-stories', {
    csrfToken: req.csrfToken(),
    story,
  })
}));

//Exports
module.exports = router;
