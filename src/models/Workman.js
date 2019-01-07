/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de definir el modelo para trabajar con documentos obtenidos desde la base de datos
 */
const mongoose = require('mongoose')
const {Schema} = mongoose

const Workman = new Schema({
    id_user: {type: String},
    profession: {type: String},
    createdAt: {type: Date, default: Date.now()},
    status: {type: Boolean, default: false}
    
})


module.exports = mongoose.model("Workman", Workman)