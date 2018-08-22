/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Main file of the project
 */
const express = require('express')
const morgan = require('morgan')
var cors = require('cors')

const app = express()

const {mongoose} = require('./database')





//Setting
//We tell the app to congigure to use the port provided by the operating system
//app.head("Access-Control-Allow-Origin: *");
app.set('port', process.env.PORT || 3001)




//Middlewares
//We indicate that we will work with data in json format
app.use(express.json());
//To see details of the requests
app.use(morgan('dev'))


app.use(cors())



//Routes
//Route of the api providers
app.use('/api/rest/login', require('./routes/accessrouter'))




//Starting the server
app.listen(app.get('port'), ()=>{
    console.log(`server started at port ${app.get('port')}`);
});