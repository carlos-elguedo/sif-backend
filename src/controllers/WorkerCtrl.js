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

//Controller to export
const WorkerCtrl = {};

WorkerCtrl.test = async (req, res) => {
  res.json({
    status: 'Llego al test',
  });
};

WorkerCtrl.update = async (req, res) => {
  const { body, user: user_request } = req;
  //console.log("WorkerCtrl.update -> user", user_request)
  //console.log("WorkerCtrl.update -> body", body)

  let correct_data = validator.verifyUserWorkerToUpdate(body);

  if (correct_data.correct) {
    const { data_register, _id: id_user } = user_request;
    const { codeCategorieSelect: profGroup, codeProfessionSelect: prof } = body;
    //Replace this after please
    let city = 1;

    correct_data.toUpdate.forEach((update) => {
      switch (update) {
        case CONSTANTS.props_to_update.profession:
          User.findOne({ data_register: data_register }, async (err, user) => {
            if (!user) {
              console.log('No existe', user);
            } else {
              //1. Search Profession
              let ExistsProfession = await Profession.findOne({
                $and: [{ group: [profGroup] }, { cod: prof }, { city: [city] }],
              });

              //2. Search profession configured previously
              let workman = await Workman.find({
                $and: [
                  { id_user },
                  {
                    profession: `${
                      ExistsProfession._id ? ExistsProfession._id : ''
                    }`,
                  },
                ],
              });
              if (workman.length === 0) {
                const newWorkman = new Workman({
                  id_user,
                  profession: ExistsProfession._id,
                  status: true,
                });

                await newWorkman.save((err) => {
                  if (err) {
                    console.log(err);
                  }
                  return res.json({
                    message: 'Actualizado correctamente',
                    option: 'OK',
                    type_error: 1,
                    hasError: false,
                  });
                });
              } else {
                return res.json({
                  message: 'No actualizado',
                  option: 'ERROR',
                  type_error: 0,
                  hasError: true,
                });
              }
            } //End else not exists user
          });
          break;

        default:
          break;
      }
    });
  } else {
    res.json({
      status: 'No updated',
    });
  }
};

module.exports = WorkerCtrl;
