/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de definir el modelo para trabajar con documentos obtenidos desde la base de datos
 */
const mongoose = require('mongoose')
const {Schema} = mongoose

const Provider = new Schema({
    address: {type: String},
    city: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    createdBy: {type: String},
    document: {type: String},
    email: {type: String, required: true},
    firstName: {type: String},
    lastName: {type: String},
    name: {type: String},
    projectedStartDate: {type: Date},
    specialty: {type: String},
    status: {type: String},
    updateAt: {type: Date}
})


module.exports = mongoose.model("Provider", Provider)