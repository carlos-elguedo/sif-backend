/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File responsible for establishing the connection to the database
 */

const mongoose = require('mongoose')
//Global configurations
const config = require('./config/config')

//We define the url to connect to the bd
const URL = config.DATABASE_URL

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

//We connect to the database provided
mongoose.connect(URL, { useNewUrlParser: true })
    .then(db => console.log('Connect to mongodb'))
    .catch(err => console.error("Error --------------->" + err))

module.exports = mongoose
