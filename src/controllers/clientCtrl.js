/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge of managing and controlling the operations requested to the api
 */

const User = require('../models/User');
const CONSTANTS = require('../constants');
const validator = require('../utils/validator');
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

clientCtrl.update = async (req, res) => {
  const { _id } = req.user;

  const { body } = req;

  const validatorResult = validator.verifyUserClientToUpdate(body);

  if (validatorResult.correct) {
    const { toUpdate } = validatorResult;
    let wasUpdate = false;
    if (toUpdate.length) {
      const {
        firstName,
        lastName,
        email,
        phone,
        areaCodePhone,
        address
      } = body;
      wasUpdate = await userRepository.changeInformation({
        data_register: '',
        firstName,
        lastName,
        email,
        phone,
        address,
        areaCodePhone,
        id: _id
      });
    }
    res.status(wasUpdate ? 200 : 202).send({
      message: wasUpdate ? 'Client Updated' : "The Client doesn't was updated",
      error: validatorResult.message,
      type: validatorResult.type
    });
  } else {
    res.status(202).send({
      message: 'No Client updated',
      error: validatorResult.message
    });
  }
};

module.exports = clientCtrl;
