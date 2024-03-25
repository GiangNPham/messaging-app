var express = require("express");
var router = express.Router();

router.post("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.json(err);
    else {
      res.redirect("/");
    }
  });
});
module.exports = router;
