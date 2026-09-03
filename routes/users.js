let express = require('express');
let router = express.Router();
const database = require('../helpers/db');
const bcrypt = require("bcrypt");
let isLogged = false;
let isCandidate = false;
let newUser;
const userClass = require('../helpers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!isLogged) {
    res.render('index');
  } else {
    res.send("You are logged in");
  }
});

router.post('/createAccount', async (req, res) => {
  const salt = 10;
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let email = req.body.email;
  let password = await bcrypt.hash(req.body.password, salt);
  let phoneNumber = req.body.phone_number;
  let birthdate = req.body.birth_date;
  database.addANewUser(firstName, lastName, email, password, phoneNumber, birthdate, 'Put your description here');
  const user = await database.getUserByEmail(req.body.email);
  newUser = new userClass.user(user.id, user.first_name, user.last_name, user.email, user.password, user.phone_number, user.birth_date, user.description, user.has_voted);
  res.redirect("/winnerCandidates");
});

router.get('/login', (req, res) => {
  res.render("login", {message : ""});
});

router.post('/logIntoAccount', async (req, res) => {
  const user = await database.getUserByEmail(req.body.email);
  try {
    const passwordsAreEqual = await bcrypt.compare(req.body.password, user.password);
    if (passwordsAreEqual) {
      newUser = new userClass.user(user.id, user.first_name, user.last_name, user.email, user.password, user.phone_number, user.birth_date, user.description, user.has_voted);
      res.redirect("/winnerCandidates");
    } else{
      res.render("login", {message : "The password is wrong"});
    }
  } catch {
    res.render("login", {message : "The email is wrong"});
  }
});

router.get('/changePassword', (req, res) => {
  res.render('passwordChange', {message : ""});
});

router.post('/changeYourPassword', async (req, res) => {
  try {
    const user = await database.getUserByEmail(req.body.email);
    const salt = 10;
    const newPassword = await bcrypt.hash(req.body.password, salt);
    await database.changePassword(user.email, newPassword);
    res.redirect('/login');
  } catch {
    res.render("passwordChange", {message : "The user does not exist"});
  }
});

router.get('/winnerCandidates', async (req, res) => {
  const candidatesList = await database.getAllCandidates();
  const candidateEmail  = await database.getCandidateEmail(newUser.email);
  try {
    if (newUser.email === candidateEmail[0].email) {
      isCandidate = true;
    }
  } catch {
    isCandidate = false;
  }
  res.render("topCandidates", { candidatesList });
});

router.get('/mainProfile', async (req, res) => {
  const user = await database.getUserByEmail(newUser.email);
  res.render("mainProfile", { user,  userCandidacy : isCandidate});
});

router.get('/changeData', async (req, res) => {
  const user = await database.getUserByEmail(newUser.email);
  res.render("changeYourData", { user });
});

router.post('/dataChanging', async (req, res) => {
  await database.changeData(newUser.email, req.body.first_name, req.body.last_name, req.body.phone_number, req.body.birth_date, req.body.description);
  res.redirect("/mainProfile");
});

router.post('/runForPresidentialElections', async(req, res) => {
  if (!isCandidate) {
    await database.addANewCandidate(newUser.id);
    isCandidate = true;
  } else {
    await database.removeCandidate(newUser.id);
    isCandidate = false;
  }
  res.redirect("/mainProfile");
}); 

router.get('/voteACandidate', async(req, res) => {
  if (!newUser.hasVoted) {
    const candidatesList = await database.getAllCandidates();
    res.render("voteYourCandidate", { candidatesList });
  } else {
    res.render("youHaveVotedWarning");
  }
})

router.post("/vote", async (req, res) => {
  await database.addVote(newUser.id, req.body.candidate);
  newUser.hasVoted = true;
  res.render("youHaveVotedWarning");
});

router.post("/cancelTheVote", async(req, res) => {
  await database.cancelVote(newUser.id);
  newUser.hasVoted = false;
  res.redirect("/winnerCandidates");
});

module.exports = router;
