/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de definir el modelo para trabajar con documentos obtenidos desde la base de datos
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Profession = new Schema({
  group: [],
  name_es: { type: String },
  name_en: { type: String },
  cod: { type: String, unique: true },
  description: { type: String },
  city: [],
  createdAt: { type: Date, default: Date.now() },
  status: { type: Boolean, default: false }
});

module.exports = mongoose.model('Profession', Profession);
