// import http status codes
const {
  BAD_REQUEST,
  NOT_AUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  NOT_ACCEPTABLE,
} = require("../utility/statusCodes");

const { NODE_ENV, DEV_CLIENT, PROD_CLIENT } = require("../config/index");

// import helper functions
const { sendError, sendSuccess } = require("../utility/helpers");

module.exports.callback = (req, res) => {
  res.redirect(
    (NODE_ENV === "development" ? DEV_CLIENT : PROD_CLIENT) + "/dashboard"
  );
};

module.exports.authStatus = (req, res) => {
  if (req.user) return sendSuccess(res, req.user);
  return sendError(res, "User failed to authenticate", NOT_AUTHORIZED);
};

module.exports.logout = (req, res) => {
  req.logout();
  res.redirect(NODE_ENV === "development" ? DEV_CLIENT : PROD_CLIENT);
};
