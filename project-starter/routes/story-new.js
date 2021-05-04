//Imports
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");


const storyValidator =[
    check('content-title')
        .exists({checkFalsy: true})
        .withMessage("Title cannot be empty"),
    check('content')
        .exists({checkFalsy: true})
        .withMessage("Story cannot be empty")
]



router.get('/', csrfProtection, asyncHandler(async(req,res) => {
    res.render("story-new", {
        title: "New Story",
        csrfToken: req.csrfToken(),
    })
}))

router.post('/', csrfProtection, storyValidator, asyncHandler(async(req,res) => {
    const { title, content } = req.body;
    const userId = req.session.auth.userId
    const newStory = await db.Story.build({
        title,
        content, 
        userId,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await newStory.save();
        res.redirect('/stories')
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