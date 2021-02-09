/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge ofacced and modify the data in the database
 */

const User = require('../models/User');
const Inbox = require('../models/Inbox');
const Message = require('../models/Message');

const sendMessage = async (idUser, idReceptor, message) => {
  try {
    let sendBy = await User.findOne({ _id: idUser });
    if (!sendBy) return { status: 'error', message: 'El usuario no existe' };
    let receptor = await User.findOne({ _id: idReceptor });
    if (!receptor) return { status: 'error', message: 'El usuario no existe' };

    if (!message) return { status: 'error', message: 'Mensaje Vacio' };

    //Check if the ibox exist
    const previousInbox = await Inbox.findOne({
      id_user: idUser,
      id_worker: idReceptor,
      status: true
    });

    if (previousInbox) {
      //Exist relation should create message and update inbox
      await Inbox.updateOne(
        { _id: previousInbox._id },
        { $set: { message, messageAt: Date.now() } }
      );
      const newMessage = await Message.create({
        id_user: idUser,
        id_worker: idReceptor,
        sentBy: idUser,
        id_inbox: previousInbox._id,
        message: message
      });

      if (!newMessage)
        return { status: 'error', message: 'error saving message' };
    } else {
      //No exists relation, should create relation and create message
      const newInbox = await Inbox.create({
        id_user: idUser,
        id_worker: idReceptor,
        sentBy: idUser,
        message: message
      });

      if (!newInbox) return { status: 'error', message: 'error saving inbox' };

      const newMessage = await Message.create({
        id_user: idUser,
        id_worker: idReceptor,
        sentBy: idUser,
        id_inbox: newInbox._id,
        message: message
      });

      if (!newMessage)
        return { status: 'error', message: 'error saving message' };
    }

    return { status: 'ok', message: 'saved' };
  } catch (e) {
    console.log('error message repo', e.message);
    return { status: 'error', message: 'error catch' };
  }
};

module.exports = {
  sendMessage
};
