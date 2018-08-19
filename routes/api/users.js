const express = require("express");
const router = express.Router();

// @route    GET api/posts/test
// @desc     Tests post route
// @access   Public

router.get("/test", (req, res) => res.json({ msg: "users works" }));

module.exports = router;
