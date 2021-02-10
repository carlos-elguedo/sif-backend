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

  const formatedInboxes = inboxes.map(inbox => {
    //console.log('🚀 ~ inbox', inbox);
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

module.exports = MessageCtrl;
