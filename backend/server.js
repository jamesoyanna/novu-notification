const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./db");
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/* connect to database */
connectToDatabase();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Novu backend." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
