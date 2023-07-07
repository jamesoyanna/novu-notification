const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  });
  
  const User = model("User", userSchema);
  
  module.exports = User;
  