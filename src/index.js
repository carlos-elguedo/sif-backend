/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Main file of the project
 */
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const passport = require('passport')
const passportConfig = require('./config/passport')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
const path = require('path');

const config = require('./config/config')

// const io = require('socket.io')();
// io.on('connection', () => { console.log('Conectado') });

var cors = require('cors')

const app = express()
const {mongoose} = require('./database')


// require('./config/passport')

// const MongoStore = require('connect-mongo')(session);

//Setting
//We tell the app to congigure to use the port provided by the operating system
//app.head("Access-Control-Allow-Origin: *");
app.set('port', process.env.PORT || 3001)




//Middlewares
//Cors app
app.use(cors())

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

// app.use(session({
//   secret: 'secret',
//   // resave: true,
//   // saveUninitialized: true
//   resave: false, // investigar mas -> https://www.npmjs.com/package/express-session 
//   saveUninitialized: false, 
//   store: new MongoStore({ 
//     mongooseConnection: mongoose
//   }) 
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(flash());


// Global Variables
// app.use((req, res, next) => {
//   next();
// });


//Routes
//Route of the api access
app.use('/api/rest/access', require('./routes/accessrouter'))

//Route of the api professions
app.use('/api/rest/profession', require('./routes/professionrouter'))

//Route of the utilist from the backend to frontend
app.use('/api/rest/utils', require('./routes/utilsRouter'))

// static files
//console.log(app.use(express.static(path.join(__dirname, 'assets'))))
app.use('/', express.static(path.join(__dirname, 'assets')));


//Starting the server
app.listen(app.get('port'), ()=>{
    console.log(`server started at port ${app.get('port')}`);
});
