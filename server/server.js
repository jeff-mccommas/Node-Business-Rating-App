
const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const flash = require('connect-flash');
const _ = require('underscore');
const app = express();
const config = require('./config/config').get(process.env.NODE_ENV);
////######### HBS SETUP ############/////





app.engine('hbs',hbs({
    extname:'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + './../views/layouts',
    partialsDir: __dirname + './../views/partials'
}));
app.set('view engine','hbs')
////######### DB ############/////
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);


app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({
   secret:'bluebird',
   resave:false,
   saveUninitialized:false,
   store: new MongoStore({
       mongooseConnection:mongoose.connection
   })
}))
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.render('home');
    
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
