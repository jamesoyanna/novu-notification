const { model, Schema } = require("mongoose");


const roleSchema = new Schema({
    name: String
  });
  
  const Role = model("Role", roleSchema);
  
  module.exports = Role;
  
