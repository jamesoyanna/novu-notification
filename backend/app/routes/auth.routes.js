const { checkDuplicateUsernameOrEmail, checkRolesExisted } = require("../middlewares/verifySignUp");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.post(
    "/api/auth/signup",
    [checkDuplicateUsernameOrEmail, checkRolesExisted],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
