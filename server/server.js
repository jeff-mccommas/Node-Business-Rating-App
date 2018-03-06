const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const engine = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();
mongoose.connect('mongodb://localhost/rateme');
app.engine('ejs',engine);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(session({
   secret:'bluebird',
   resave:false,
   saveUninitialized:false
}))
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('index')
    
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});