let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let session = require('express-session')
let logger = require('morgan');

let indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const candidatesRouter = require('./routes/candidates');
const votesRouter = require('./routes/voting');
let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret : "Presidential-Elections-Do-Not-Tell-Anyone", name : "currentUser", cookie : { maxAge : 600000}}));
//app.use(session({secret : "There-are-presidential-elections-underway", name : "current-election-round", cookie : {maxAge : 60000}}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',usersRouter);
app.use('/', candidatesRouter);
app.use('/', votesRouter);
app.get('/', (req, res) => {
  res.send("Wors");
})

module.exports = app;
