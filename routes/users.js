let express = require('express');
let router = express.Router();
const database = require('../helpers/db');
const candidatesDataBase = require('../helpers/candidatesOperations')
const bcrypt = require("bcrypt");
let newUser;
const userClass = require('../helpers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
    res.render('index');
  } else {
    res.redirect("/winnerCandidates");
  }
});

router.post('/register', async (req, res) => {
  const salt = 10;
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let email = req.body.email;
  let password = await bcrypt.hash(req.body.password, salt);
  let phoneNumber = req.body.phone_number;
  let birthdate = req.body.birth_date;
  database.addANewUser(firstName, lastName, email, password, phoneNumber, birthdate, 'Put your description here');
  const user = await database.getUserByEmail(req.body.email);
  const possibleCandidateEmail = await database.getCandidateEmail(user.email);
  let isCandidate =  possibleCandidateEmail[0] !== undefined;
  newUser = new userClass.user(user.id, user.first_name, user.last_name, user.email, user.password, user.phone_number, user.birth_date, user.description, user.has_voted, isCandidate);
  req.session.user = newUser;
  res.redirect("/winnerCandidates");
});

router.get('/loginPage', (req, res) => {
  res.render("login", {message : ""});
});

router.post('/login', async (req, res) => {
  const user = await database.getUserByEmail(req.body.email);
  try {
    const passwordsAreEqual = await bcrypt.compare(req.body.password, user.password);
    if (passwordsAreEqual) {
      const possibleCandidateEmail = await candidatesDataBase.getCandidateEmail(user.email);
      let isCandidate = possibleCandidateEmail[0] !== undefined;
      newUser = new userClass.user(user.id, user.first_name, user.last_name, user.email, user.password, user.phone_number, user.birth_date, user.description, user.has_voted, isCandidate);
      req.session.user = newUser;
      res.redirect("/winnerCandidates");
    } else{
      res.render("login", {message : "The password is wrong"});
    }
  } catch (err) {
    res.render("login", {message : "The email is wrong"});
  }
});

router.get('/change-Password', (req, res) => {
  res.render('passwordChange', {message : ""});
});

router.post('/changeYourPassword', async (req, res) => {
  try {
    const user = await database.getUserByEmail(req.body.email);
    const salt = 10;
    const newPassword = await bcrypt.hash(req.body.password, salt);
    await database.changePassword(user.email, newPassword);
    res.redirect('/loginPage');
  } catch {
    res.render("passwordChange", {message : "The user does not exist"});
  }
});

router.get('/winnerCandidates', async (req, res) => {
  const candidatesList = await candidatesDataBase.getAllCandidates();
  res.render("topCandidates", { candidatesList });
});

router.get('/mainProfile', async (req, res) => {
  const user = await database.getUserByEmail(req.session.user.email);
  res.render("mainProfile", { user,  userCandidacy : req.session.user.isCandidate});
});

router.get('/changeData', async (req, res) => {
  const user = await database.getUserByEmail(req.session.user.email);
  res.render("changeYourData", { user });
});

router.post('/dataChanging', async (req, res) => {
  await database.changeData(req.session.user.email, req.body.first_name, req.body.last_name, req.body.phone_number, req.body.birth_date, req.body.description);
  res.redirect("/mainProfile");
});

module.exports = router;
