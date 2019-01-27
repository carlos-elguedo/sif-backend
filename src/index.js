/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Main file of the project
 */
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const flash = require('connect-flash');
const passport = require('passport')

var cors = require('cors')

const app = express()
const {mongoose} = require('./database')
require('./config/passport')

//Setting
//We tell the app to congigure to use the port provided by the operating system
//app.head("Access-Control-Allow-Origin: *");
app.set('port', process.env.PORT || 3001)




//Middlewares
//Cors app
app.use(cors())


//We indicate that we will work with data in json format
app.use(express.json());
//To see details of the requests
app.use(morgan('dev'))

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());


// Global Variables
app.use((req, res, next) => {
  next();
});


//Routes
//Route of the api access
app.use('/api/rest/access', require('./routes/accessrouter'))

//Route of the api professions
app.use('/api/rest/profession', require('./routes/professionrouter'))




//Starting the server
app.listen(app.get('port'), ()=>{
    console.log(`server started at port ${app.get('port')}`);
});
