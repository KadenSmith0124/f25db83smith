var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString);
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
    console.log("Connection to DB succeeded")
});

var Spell = require("./models/spell");

// We can seed the collection if needed on server start
async function recreateDB(){
    // Delete everything
    await Spell.deleteMany();

    let instance1 = new Spell({
        name: "Firebolt",
        level: 0,
        school: "Evocation",
        description: "A bolt of fire that deals light damage at range."
    });

    let instance2 = new Spell({
        name: "Healing Word",
        level: 1,
        school: "Evocation",
        description: "A quick burst of healing energy to a creature you can see."
    });

    let instance3 = new Spell({
        name: "Mage Armor",
        level: 1,
        school: "Abjuration",
        description: "Protective magical force surrounds a willing creature."
    });

    instance1.save().then(doc=>{
        console.log("First spell saved");
    }).catch(err=>{
        console.error(err);
    });

    instance2.save().then(doc=>{
        console.log("Second spell saved");
    }).catch(err=>{
        console.error(err);
    });

    instance3.save().then(doc=>{
        console.log("Third spell saved");
    }).catch(err=>{
        console.error(err);
    });
}

let reseed = true;
if (reseed) {recreateDB();}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
