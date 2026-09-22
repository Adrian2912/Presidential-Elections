const express = require("express");
const router = express.Router();
const database = require("../helpers/voting");
const candidatesDataBase = require("../helpers/candidatesOperations")

router.get('/voteACandidate', async(req, res) => {
  if (!req.session.user.hasVoted) {
    const candidatesList = await candidatesDataBase.getAllCandidates();
    res.render("voteYourCandidate", { candidatesList });
  } else {
    res.render("youHaveVotedWarning");
  }
})

router.post("/vote", async (req, res) => {
  await database.addVote(req.session.user.id, req.body.candidate);
  req.session.user.hasVoted = true;
  res.render("youHaveVotedWarning");
});

router.post("/cancelTheVote", async(req, res) => {
  await database.cancelVote(req.session.user.id);
  req.session.user.hasVoted = false;
  res.redirect("/winnerCandidates");
});

module.exports = router;