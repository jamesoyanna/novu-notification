const { ROLES, user: User } = require("../models");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
