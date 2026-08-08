var express = require('express');
var router = express.Router();
const database = require('../helpers/db');
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createAccount', async (req, res) => {
  const salt = 10;
  let firstName = req.body.first_name;
  let lastName = req.body.last_name;
  let email = req.body.email;
  let password = await bcrypt.hash(req.body.password, salt);
  let phoneNumber = req.body.phone_number;
  let birthdate = req.body.birth_date;
  console.log(password);
  database.addANewUser(firstName, lastName, email, password, phoneNumber, birthdate, 'Put your description here');
  res.send("New user created");
});

router.get('/login', (req, res) => {
  res.render("login", {message : ""});
});

router.post('/logIntoAccount', async (req, res) => {
  const user = await database.getUserByEmail(req.body.email);
  try {
    const passwordsAreEqual = await bcrypt.compare(req.body.password, user.password);
    if (passwordsAreEqual) {
      res.send("Welcome Back");
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
    res.redirect('/users/login');
  } catch {
    res.render("passwordChange", {message : "The user does not exist"});
  }
})

module.exports = router;
