/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge of managing and controlling the operations requested to the api
 */

//Controller to export
const MessageCtrl = {};
const Inbox = require('../models/Inbox');
const messageRepository = require('../repositories/message.repo');

MessageCtrl.test = async (req, res) => {
  res.json({
    status: 'Llego al test'
  });
};

MessageCtrl.getMessages = async (req, res) => {
  const { user } = req;
  const { _id: id_user } = user;

  const inboxes = await messageRepository.getInbox(id_user);

  if (!inboxes.length) {
    res.json({
      status: 'empty',
      message: inboxes.message,
      inboxes: []
    });
  } else {
    const formatedInboxes = inboxes.map(inbox => {
      const GLOBAL_ID_USER = `${id_user}`;
      const ID_USER = `${inbox.id_user}`;
      /* const ID_WORKER = `${inbox.id_worker}`; */
      const ID_SENTBY = `${inbox.sentBy}`;
      /* const ID_INTERNAL_USER_ID = `${inbox.user_data[0]._id}`;
      const ID_INTERNAL_RECEPTOR_ID = `${inbox.receptor_data[0]._id}`; */

      let sentBy =
        GLOBAL_ID_USER === ID_SENTBY
          ? 'Tu'
          : inbox.receptor_data[0].firstName || inbox.receptor_data[0].name;

      const nameChat =
        GLOBAL_ID_USER === ID_USER
          ? inbox.receptor_data[0].name || inbox.receptor_data[0].firstName
          : inbox.user_data[0].name || inbox.user_data[0].firstName;

      return {
        id: inbox._id,
        with: nameChat,
        time: inbox.messageAt,
        message: inbox.message,
        sentBy
      };
    });

    res.json({
      status: 'ok',
      inboxes: formatedInboxes
    });
  }
};

MessageCtrl.sendMessage = async (req, res) => {
  const { body, user: user_request } = req;
  const { _id: id_user } = user_request;
  const wassend = await messageRepository.sendMessage(
    id_user,
    body.idWorker,
    body.message
  );

  res.json(wassend);
};

MessageCtrl.getChatMessage = async (req, res) => {
  const { user: user_request } = req;
  const { inbox } = req.query;
  const { _id: GLOBAL_ID_USER } = user_request;

  const result = await messageRepository.getMessages(inbox, GLOBAL_ID_USER);

  if (!result.length) {
    res.json({
      status: 'empty',
      message: result.message,
      messages: []
    });
  } else {
    const messages = result[0];
    const inbox = result[1];
    const formatedMessages = messages.map(message => {
      const ID_SENTBY = `${message.sentBy}`;

      let sentBy = `${GLOBAL_ID_USER}` === ID_SENTBY ? 'user' : 'other';

      return {
        id: message._id,
        time: message.messageAt,
        message: message.message,
        sentBy
      };
    });

    const nameChat =
      `${GLOBAL_ID_USER}` === `${inbox.id_user}`
        ? inbox.receptor_data[0].name || inbox.receptor_data[0].firstName
        : inbox.user_data[0].name || inbox.user_data[0].firstName;
    const idOtherUser =
      `${GLOBAL_ID_USER}` === `${inbox.id_user}`
        ? inbox.receptor_data[0]._id
        : inbox.user_data[0]._id;

    res.json({
      status: 'ok',
      messages: formatedMessages,
      nameChat,
      idOtherUser
    });
  }
};

module.exports = MessageCtrl;
