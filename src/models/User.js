/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de definir el modelo para trabajar con documentos obtenidos desde la base de datos
 */
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const {Schema} = mongoose


const User = new Schema({
    name: {type: String},
    password: {type: String},
    data_register: {type: String},
    age: {type: Date},
    type: {type: String},
    createdAt: {type: Date, default: Date.now()},
    status: {type: Boolean, default: false}
    
})

User.methods.encryptPassword = async (password_normal) => {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password_normal, salt);
    return hash;
  };
  
User.methods.correctPassword = async function (password_user) {
    return await bcryptjs.compare(password_user, this.password);
  };

module.exports = mongoose.model("User", User)