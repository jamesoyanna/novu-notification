const jwt = require("jsonwebtoken");
const { user: User, role: Role } = require("../models");
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const checkRole = (req, res, next, roleName) => {
  User.findById(req.userId, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    Role.findOne({ name: roleName }, (err, role) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      if (!user.roles.includes(role._id)) {
        return res.status(403).send({ message: `Require ${roleName} Role!` });
      }

      next();
    });
  });
};

const isAdmin = (req, res, next) => {
  checkRole(req, res, next, "admin");
};

const isModerator = (req, res, next) => {
  checkRole(req, res, next, "moderator");
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};

module.exports = authJwt;
