/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * Archivo encargado de definir el modelo para trabajar con documentos obtenidos desde la base de datos
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Inbox = new Schema({
  id_user: { type: Object },
  id_worker: { type: Object },
  sentBy: { type: Object },
  message: { type: Object },
  createdAt: { type: Date, default: Date.now() },
  messageAt: { type: Date, default: Date.now() },
  status: { type: Boolean, default: true }
});

module.exports = mongoose.model('Inbox', Inbox);
