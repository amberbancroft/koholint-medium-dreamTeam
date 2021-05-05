//Imports
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");


router.get('/', csrfProtection, asyncHandler(async(req, res) => {
    const userId = req.session.auth.userId
    const stories = await db.Story.findAll({where: {userId}})
    res.render("stories", {
        title: "Stories",
        csrfToken: req.csrfToken(),
        stories,
    })
}))















//Exports
module.exports = router;
