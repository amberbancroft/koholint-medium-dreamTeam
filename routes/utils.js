//Imports
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

//Error Handling
const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const timestampShortener = timestamp => timestamp.toString().split(" ").splice(0, 4).join(" ");
//Exports
module.exports = {
  csrfProtection,
  asyncHandler,
  timestampShortener,
};

