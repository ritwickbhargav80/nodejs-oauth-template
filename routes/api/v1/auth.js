const express = require("express");
const passport = require("passport");
const router = express.Router();

const { NODE_ENV, DEV_CLIENT, PROD_CLIENT } = require("../../../config");

// middlewares
let { catchErrors } = require("../../../config/errorHandler");
const {
  callback,
  logout,
  authStatus,
} = require("../../../controllers/auth_controller");

// routes
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: NODE_ENV === "development" ? DEV_CLIENT : PROD_CLIENT,
  }),
  catchErrors(callback)
);
router.get("/google/status", catchErrors(authStatus));
router.get("/logout", catchErrors(logout));

// export router
module.exports = router;
