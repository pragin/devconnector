const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Import api routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MLab
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello!"));

//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/Posts", posts);

//Define the port to be used in Heroku and localhost
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port number ${port}`));
