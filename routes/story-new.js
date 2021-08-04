//Imports
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");


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
        }),
    check('imgUrl')
        .optional({checkFalsy: true})
        .isURL()
        .withMessage("Must be a valid URL")
]



router.get('/', csrfProtection, asyncHandler(async(req,res) => {
    res.render("story-new", {
        title: "New Story",
        csrfToken: req.csrfToken(),
    })
}))

router.post('/', csrfProtection, storyValidator, asyncHandler(async(req,res) => {
    const { title, content, imgUrl } = req.body;
    const likeCount = 0
    const userId = req.session.auth.userId
    const newLike = await db.Like.create({
        likeCount,
    })
    const likesId = newLike.id
    const newStory = await db.Story.build({
        title,
        content,
        userId,
        imgUrl,
        likesId,
    });
    

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await newStory.save();
        res.redirect(`/stories/${userId}`)
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render("story-new", {
            title: "New Story",
            csrfToken: req.csrfToken(),
            errors,
        })
    }
}))





























//Exports
module.exports = router;
