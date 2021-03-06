/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge of managing and controlling the operations requested to the api
 */

const User = require('../models/User');
const Workman = require('../models/Workman');
const Profession = require('../models/Profession');

const validator = require('../utils/validator');

const CONSTANTS = require('../constants');

const userRepository = require('../repositories/users.repo');

const workerRepository = require('../repositories/workers.repo');

//Controller to export
const WorkerCtrl = {};

WorkerCtrl.test = async (req, res) => {
  res.json({
    status: 'Llego al test'
  });
};

WorkerCtrl.getWorker = async (req, res) => {
  const { _id } = req.user;

  const data = await userRepository.getWorkerData(_id);

  res.send(data);
};

WorkerCtrl.update = async (req, res) => {
  let WASUPDATED_DATA_WORK = false,
    WASUPDATED_DATA_PERSONAL = false;
  const { body, user: user_request } = req;

  let correct_data = validator.verifyUserWorkerToUpdate(body);

  if (correct_data.correct) {
    const { data_register, _id: id_user } = user_request;
    const {
      codeCategorieSelect: professionGroup,
      codeProfessionSelect: professionCode,
      edit_first_name: firstName,
      edit_last_name: lastName,
      edit_email: email,
      edit_phone: phone,
      edit_address: address,
      edit_disponibily: disponibility
    } = body;

    const { toUpdate } = correct_data;
    for (let i = 0; i < toUpdate.length; i++) {
      const change = toUpdate[i];
      switch (change) {
        case CONSTANTS.props_to_update.profession:
          WASUPDATED_DATA_WORK = await userRepository.changeProfession({
            data_register,
            id_user,
            professionGroup,
            professionCode
          });
          break;

        case CONSTANTS.props_to_update.first_name:
        case CONSTANTS.props_to_update.last_name:
        case CONSTANTS.props_to_update.email:
        case CONSTANTS.props_to_update.phone:
        case CONSTANTS.props_to_update.address:
        case CONSTANTS.props_to_update.disponibility:
          WASUPDATED_DATA_PERSONAL = await userRepository.changeInformation({
            data_register,
            firstName,
            lastName,
            email,
            phone,
            address,
            disponibility
          });
          break;
        default:
          console.log('DEFAULT change profile', change);
      }
    }

    if (WASUPDATED_DATA_WORK || WASUPDATED_DATA_PERSONAL) {
      return res.json({
        message: 'Actualizado correctamente',
        option: 'OK',
        type_error: 1,
        hasError: false
      });
    } else {
      return res.json({
        message: 'No actualizado',
        option: 'ERROR',
        type_error: 0,
        hasError: true
      });
    }
  } else {
    res.json({
      status: 'No actualizo',
      option: 'ERROR',
      type_error: 0,
      hasError: true
    });
  }
};

WorkerCtrl.searchWorker = async (req, res) => {
  const { q, offset, order, limit, sortBy, searchBy } = req.query;

  const data = await workerRepository.searchWorkers({
    q,
    offset,
    order,
    limit,
    sortBy,
    lang: 'es',
    searchBy
  });

  if (data.length === 0) {
    res.status(202).send({
      message: 'No workers found',
      workers: [],
      size: 0,
      offset: 0,
      limit: 0
    });
  } else {
    res.send({
      message: 'Ok',
      workers: data,
      size: data.length,
      offset: 10,
      limit: 10
    });
  }
};

WorkerCtrl.viewProfile = async (req, res) => {
  const { id } = req.query;

  if (!id)
    res.status(400).send({
      message: 'No workers to view'
    });

  const data = await workerRepository.getProfile(id);

  res.send(data);
};

module.exports = WorkerCtrl;
