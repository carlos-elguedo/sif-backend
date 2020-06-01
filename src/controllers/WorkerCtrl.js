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
    status: 'Llego al test'
  });
};

WorkerCtrl.update = async (req, res) => {
  const { body, user: user_request } = req;
  //console.log("WorkerCtrl.update -> user", user_request)
  //console.log("WorkerCtrl.update -> body", body)

  let correct_data = validator.verifyUserWorkerToUpdate(body);

  if (correct_data.correct) {
    const { data_register, _id: id_user } = user_request;
    const {
      codeCategorieSelect: profGroup,
      codeProfessionSelect: prof,
      edit_first_name: firstName,
      edit_last_name: lastName,
      edit_email: email,
      edit_phone: phone
    } = body;

    //Replace this after please
    let city = 1,
      COMMON_DATA_UPDATED = false,
      DATA_UPDATED = false,
      counter_updated = 0;

    correct_data.toUpdate.forEach(async update => {
      counter_updated += 1;
      switch (update) {
        case CONSTANTS.props_to_update.profession:
          await User.findOne(
            { data_register: data_register },
            async (err, user) => {
              if (!user) {
                console.log('No existe', user);
              } else {
                //1. Search Profession
                let ExistsProfession = await Profession.findOne({
                  $and: [
                    { group: [profGroup] },
                    { cod: prof },
                    { city: [city] }
                  ]
                });

                //2. Search profession configured previously
                let workman = await Workman.find({
                  $and: [
                    { id_user },
                    {
                      profession: `${
                        ExistsProfession._id ? ExistsProfession._id : ''
                      }`
                    }
                  ]
                });
                if (workman.length === 0) {
                  const newWorkman = new Workman({
                    id_user,
                    profession: ExistsProfession._id,
                    status: true
                  });

                  await newWorkman.save(err => {
                    if (err) {
                      console.log(err);
                    }
                    DATA_UPDATED = true;
                  });
                } else {
                  //ya tiene ese trabajo
                }
              } //End else not exists user
            }
          );
          break;

        case CONSTANTS.props_to_update.first_name:
        case CONSTANTS.props_to_update.last_name:
        case CONSTANTS.props_to_update.email:
        case CONSTANTS.props_to_update.phone:
          console.log('ssssssssssssssssssssssssssssssssssss', update);
          console.log("WorkerCtrl.update -> COMMON_DATA_UPDATED", COMMON_DATA_UPDATED)
          if (!COMMON_DATA_UPDATED) {
            
            await User.findOne(
              { data_register: data_register },
              async (err, user) => {
                if (!user) {
                  console.log('No existe', user);
                } else {
                  //name
                  let fn = firstName || user.firstName,
                    ln = lastName || user.lastName;
                  user.firstName = fn;
                  user.lastName = ln;
                  user.name = `${fn} ${ln}`;

                  //email and phone
                  let em = email || user.email,
                    ph = phone || user.phone;

                  user.email = em;
                  user.phone = ph;

                  //---------------
                  Promise.resolve(user.save());
                  COMMON_DATA_UPDATED = true;
                }
              }
            );
          }

          break;

        default:
          console.log('Defaullllllllllllllllllllllll', update);
          break;
      } //Fin del switch
    }); //Fin del foreach

    
    console.log("WorkerCtrl.update -> COMMON_DATA_UPDATED", COMMON_DATA_UPDATED)
    console.log("WorkerCtrl.update -> DATA_UPDATED", DATA_UPDATED)
      if (DATA_UPDATED || COMMON_DATA_UPDATED) {
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
      status: 'No updated'
    });
  }
};

module.exports = WorkerCtrl;
