//Imports
const express = require("express");
const { csrfProtection, asyncHandler, timestampShortener} = require("./utils");
const db = require("../db/models");
const {Comment, User, Like} = db;
const { validationResult, check } = require("express-validator");
const router = express.Router();

const getTenStories = async () => {
  const allStories = await db.Story.findAll();
  const randomSelection = [];
  const storiesToDisplay = [];
  while (randomSelection.length !== allStories.length){
    if(randomSelection.length === 10) break;
    let randomNum = Math.floor(Math.random() * allStories.length);
    if(randomSelection.includes(randomNum)) continue; 
    randomSelection.push(randomNum);
  }
  for(let num of randomSelection){
    storiesToDisplay.push(allStories[num]);
  }

  return storiesToDisplay;
}

const getThreeUsers = async (req, limit, usersToDisplay = []) => {

  const allUsers = await db.User.findAll({
    include: {
      model: db.Follow,
      as: 'followed'
    }
  });
  const randomNums = [];
  let currentLoggedInUser = null;
  while(randomNums.length !== allUsers.length){
    if(randomNums.length === limit) break;
    if(usersToDisplay.length === limit) break;
    let randomNum = Math.floor(Math.random() * allUsers.length);
    if(currentLoggedInUser == randomNum)continue;
    if(randomNums.includes(randomNum)) continue;
    randomNums.push(randomNum);
  }
  for(let num of randomNums){
    usersToDisplay.push(allUsers[num]);
  }
  if(req.session.auth){
    currentLoggedInUser = req.session.auth.userId;
  }
  for(let i = 0; i < usersToDisplay.length; i++){
    let user = usersToDisplay[i];
    if(user.id === currentLoggedInUser){
      usersToDisplay.splice(i, 1);
    }
  }

  return usersToDisplay;
}

/* GET home page. */
router.get("/", asyncHandler(async (req, res, next) => {
  const storiesToRender = await getTenStories();
  const usersToRender = await getThreeUsers(req, 3);
  storiesToRender.forEach(story => story.timestamp = timestampShortener(story.createdAt));
  const firstSixStories = storiesToRender.slice(0,6);
  firstSixStories.forEach((story,i) => story.number = i+1);
  const lastFourStories = storiesToRender.slice(6);
  let user;
  if(req.session.auth){
    user = await db.User.findByPk(req.session.auth.userId);
    for(let currentUser of usersToRender){
      let followers = currentUser.followed;
      for(let follower of followers){
        if(follower.followerId === user.id){
          currentUser.following = true; //set a property that shows loggedin user is following
        }
      }
    }
  }
  // console.log("*******EDITED USER**********", usersToRender[0]);
  res.render("index", {
    title: "Home",
    authenticated: res.locals.authenticated,
    topStories: firstSixStories,
    otherStories: lastFourStories,
    usersToRender,
    user
  });
}));


//View your story
router.get('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
  let loggedInUserId = null;
  let isCurrentUsersStory = false;
  const id = req.params.id
  const story = await db.Story.findOne(

      {where: {id} , include: {model: Comment, include: [User, Like]}}
  );
  if (req.session.auth){
    loggedInUserId = req.session.auth.userId
    if (loggedInUserId === story.userId){
      isCurrentUsersStory = true;
    }
  }

  //Adds a property 'timestamp' to each comment object which contains shortened date as string
  story.Comments.forEach(comment => {
    comment.timestamp = timestampShortener(comment.createdAt.toString());
    console.log("EEEDDIDIIITTTED COMMMMENT", comment.timestamp);
  });

  const user = await db.User.findOne( {where: story.userId});
  const likes = await db.Like.findByPk(story.likesId);
    res.render('individual-stories', {
      csrfToken: req.csrfToken(),
      story,
      user,
      isCurrentUsersStory,
      likes,
      pageId: req.params.id,
      loggedInUserId,
    })

}));

router.patch('/:id(\\d+)', asyncHandler(async(req, res) => {

  const id = req.params.id;
  const story = await db.Story.findOne(
    {where: {id}}
);
  const likes = await db.Like.findByPk(story.likesId);
  let likeCount = likes.likeCount;
  likeCount+=1;
  console.log("THIIIIIIIIS", likeCount)
  await likes.update({
    likeCount,
  })
  res.json({likeCount})
}))


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

// Edit your story
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

// Post your edited story
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

// Delete your story
router.post('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
  const id = req.params.id
  const story = await db.Story.findOne({
    where: {id}
  })
  await story.destroy();
  res.redirect('/stories');
}));


//Exports
module.exports = router;
