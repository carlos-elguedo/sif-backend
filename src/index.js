/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Main file of the project
 */
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const bodyParser = require('body-parser')
const path = require('path');

const config = require('./config/config')


const cors = require('cors')

const app = express()
const {mongoose} = require('./database')


//Setting

//Cors app
// app.use(cors())

//We tell the app to congigure to use the port provided by the operating system
//app.head("Access-Control-Allow-Origin: *");
app.set('port', process.env.PORT || 3001)


//Middlewares

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS');
    // 'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
    next();
  });
  

app.use(session({
    secret: "Secret",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: config.DATABASE_URL,
        autoReconnect: true
    })
}))


app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//We indicate that we will work with data in json format
// app.use(express.json());
//To see details of the requests
app.use(morgan('dev'))


//Routes
//Route of the api access
app.use('/api/rest/access', require('./routes/access'))

//Route of the api professions
app.use('/api/rest/profession', require('./routes/profession'))

//Route of the utilist from the backend to frontend
app.use('/api/rest/utils', require('./routes/utils'))

//Route of the workers
app.use('/api/rest/worker', require('./routes/worker'))

//Route of the upload of files
app.use('/api/rest/uploads', require('./routes/upload'))

// static files
//console.log(app.use(express.static(path.join(__dirname, 'assets'))))
app.use('/', express.static(path.join(__dirname, 'assets')));


//Starting the server
app.listen(app.get('port'), ()=>{
    console.log(`server started at port ${app.get('port')}`);
});
