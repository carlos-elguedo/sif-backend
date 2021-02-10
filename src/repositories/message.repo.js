/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge ofacced and modify the data in the database
 */
const mongoose = require('mongoose');
const User = require('../models/User');
const Inbox = require('../models/Inbox');
const Message = require('../models/Message');

const sendMessage = async (idUser, idReceptorString, message) => {
  try {
    const idReceptor = mongoose.Types.ObjectId(idReceptorString);
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

const getInbox = async idUser => {
  try {
    let user = await User.findOne({ _id: idUser });
    if (!user) return { status: 'error', message: 'El usuario no existe' };

    //Check if the ibox exist
    const Inboxes = await Inbox.find({
      $or: [{ id_user: idUser }, { id_worker: idUser }],
      $and: [{ status: true }]
    });

    if (Inboxes) {
      //El usuario tiene inbox formatearlos para retornarlos
      const inboxesIds = Inboxes.map(item => {
        return item._id;
      });

      const InBoxesData = await Inbox.aggregate([
        {
          $match: {
            _id: { $in: inboxesIds }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'id_user',
            foreignField: '_id',
            as: 'user_data'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'id_worker',
            foreignField: '_id',
            as: 'receptor_data'
          }
        }
      ]);

      return InBoxesData;
    } else {
      //No tiene inbox
      return [];
    }
  } catch (e) {
    console.log('error message repo', e.message);
    return {
      status: 'error',
      message: 'Error while get inboxes: ' + e.message
    };
  }
};

const getMessages = async (idInboxString, idUser) => {
  try {
    const idInbox = mongoose.Types.ObjectId(idInboxString);
    let user = await User.findOne({ _id: idUser });
    if (!user) return { status: 'error', message: 'El usuario no existe' };

    //Check if the ibox exist
    const messages = await Message.find({
      id_inbox: idInbox
    }).sort({ messageAt: -1 });

    if (!messages.length)
      return { status: 'error', message: 'No hay mensajes' };

    const [InBoxesData] = await Inbox.aggregate([
      {
        $match: {
          _id: idInbox
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'id_user',
          foreignField: '_id',
          as: 'user_data'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'id_worker',
          foreignField: '_id',
          as: 'receptor_data'
        }
      }
    ]);

    return [messages, InBoxesData];
  } catch (e) {
    console.log('error message repo getMessages', e.message);
    return {
      status: 'error',
      message: 'Error while get messages: ' + e.message
    };
  }
};

module.exports = {
  sendMessage,
  getInbox,
  getMessages
};
