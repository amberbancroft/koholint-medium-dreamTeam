const express = require("express");
const { timestampShortener, asyncHandler} = require("./utils");
const db = require("../db/models");
const { validationResult, check } = require("express-validator");
const router = express.Router();

router.post("/:storyId", asyncHandler(async (req, res) => {
 //Need to receive userId, storyId, and then create a new Like record to create comment
 //user can only post comment if they are logged in, send back a boolean to represent this
 //use req.session.auth to get userId
 //if req.session.auth exists, set boolean to true
   //if it DOESNT exist, set boolean to false
    
    let authorized = false; 
    if(req.session.auth){
        
        const {content, storyId} = req.body;
        let userId = req.session.auth.userId;
        authorized = true;

        const like = await db.Like.create({likeCount: 0})
        const comment = await db.Comment.create({content, storyId, likesId: like.id, userId})
        const userCommenting = await db.User.findByPk(userId);
        comment.timestamp = timestampShortener(comment.createdAt);
        res.json({
            authorized, 
            content: comment.content, 
            userName: userCommenting.userName, 
            createdAt: comment.timestamp, 
            likes: like.likeCount,
            commentId: comment.id
        }); //will need to add a separate eventlistener and api route for this
        return;
    } 
    
    console.log(`THIS COMMENT BELONGS TO STORY WITH ID ${req.params.id}`);
    res.json({authorized});
}));

router.put("/:commentId", asyncHandler(async (req, res) => {
//Update the comment and send back the updated content for ajax rendering 
    const commentId = req.params.commentId
    const {content} = req.body;
    const comment = await db.Comment.findByPk(commentId);
    comment.update({content});
    console.log("PUT REQUEST RECEIIIIVED!! EDITING COMMENT", comment.content);
    res.json({content});
}));

router.delete("/:commentId", asyncHandler(async (req, res) => {
    const commentId = req.params.commentId
    console.log("DELETE REQUEST RECIIIIEVED!!!! DELETING COMMMENT", commentId);
    const comment = await db.Comment.findByPk(commentId);
    comment.destroy();
    res.json({delete: true}); //added this so fetch await completes
}));

module.exports = router;