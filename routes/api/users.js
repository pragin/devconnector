const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../../models/User");

// @route    GET api/users/test
// @desc     Tests users route
// @access   Public

router.get("/test", (req, res) => res.json({ msg: "users works" }));

// @route    Post api/users/register
// @desc     Tests users route
// @access   Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.status(404).json({ email: "Email already exists" });
    } else {
      //create an avatar
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", // Rating
        d: "mm" //Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
