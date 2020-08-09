/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge of managing and controlling the operations requested to the api
 */

const User = require('../models/User');

const CONSTANTS = require('../constants');

const userRepository = require('../repositories/users.repo');

//Controller to export
const clientCtrl = {};

clientCtrl.test = async (req, res) => {
  res.json({
    status: 'Llego al test'
  });
};

clientCtrl.getClient = async (req, res) => {
  const { _id } = req.user;

  const data = await userRepository.getClientData(_id);

  res.send(data);
};

module.exports = clientCtrl;
