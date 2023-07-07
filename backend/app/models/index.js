const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {
    mongoose: mongoose,
    user: require("./user.model"),
    role: require("./role.model"),
    ROLES: ["user", "admin", "moderator"]
  };
  
  module.exports = db;
  