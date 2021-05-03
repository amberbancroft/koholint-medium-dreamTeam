//Imports
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Home",
    authenticated: res.locals.authenticated,
  });
});

//Exports
module.exports = router;
