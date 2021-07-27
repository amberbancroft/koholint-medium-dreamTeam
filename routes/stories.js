//Imports
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");


router.get('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
    // const userId = req.session.auth.userId
    let isCurrentUser = false;
    const userId = parseInt(req.params.id,10);
    const stories = await db.Story.findAll({where: {userId}})

    const currentUser = await db.User.findByPk(userId);
    const name = currentUser.userName;

    if (req.session.auth.userId === userId){
        isCurrentUser = true;
    }

    res.render("stories", {
        title: "Stories",
        csrfToken: req.csrfToken(),
        stories,
        isCurrentUser,
        name
    })
}))















//Exports
module.exports = router;
