let express = require("express");
let router = express.Router();
let database = require("../helpers/candidatesOperations");

router.post('/runForPresidentialElections', async(req, res) => {
  if (!req.session.user.isCandidate) {
    await database.addANewCandidate(req.session.user.id);
    req.session.user.isCandidate = true;
  } else {
    await database.removeCandidate(req.session.user.id);
    req.session.user.isCandidate = false;
  }
  res.redirect("/mainProfile");
}); 

module.exports = router;