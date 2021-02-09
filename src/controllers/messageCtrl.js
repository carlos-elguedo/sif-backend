/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge of managing and controlling the operations requested to the api
 */

//Controller to export
const MessageCtrl = {};
const messageRepository = require('../repositories/message.repo');

MessageCtrl.test = async (req, res) => {
  res.json({
    status: 'Llego al test'
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
