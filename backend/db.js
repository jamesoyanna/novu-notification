// Database connection
const mongoose = require('mongoose');
const db = require("./app/models");
const Role = db.role;

const connectToDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Database connected successfully.');
      initial()
    } catch (err) {
      console.error('Error connecting to database:', err);
    }
  }
  module.exports = connectToDatabase;

  async function initial() {
    try {
      const count = await Role.estimatedDocumentCount();
      if (count === 0) {
        await Promise.all([
          new Role({ name: "user" }).save(),
          new Role({ name: "moderator" }).save(),
          new Role({ name: "admin" }).save()
        ]);
  
        console.log("Added 'user', 'moderator', and 'admin' to roles collection.");
      }
    } catch (err) {
      console.error("Error initializing roles:", err);
    }
  }
  