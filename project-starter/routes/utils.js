//Imports
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

//Error Handling
const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

//Exports
module.exports = {
  csrfProtection,
  asyncHandler,
};
