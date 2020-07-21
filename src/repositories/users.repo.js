/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge ofacced and modify the data in the database
 */

const User = require('../models/User');
const Workman = require('../models/Workman');
const Profession = require('../models/Profession');

const moment = require('moment');
const { cities } = require('../constants');

//Get's
const getWorkerData = async id => {
  let data = {};
  let user = await User.findOne({ _id: id });

  //user data
  data.name = user.name || '';
  data.email = user.email || '';
  data.phone = user.phone || '';
  data.firstName = user.firstName || '';
  data.lastName = user.lastName || '';
  data.age_count = Math.abs(moment(user.age).diff(moment(), 'years'));
  data.address = user.address || '';
  data.type = user.type;
  //data.profileImage =

  //worker data
  let works = await Workman.find({ id_user: id });
  data.works = [];

  if (works) {
    await Promise.all(
      works.map(async work => {
        let profession = await Profession.findById(work.profession);
        if (profession) {
          let professionData = {
            group: profession.group,
            name_es: profession.name_es,
            name_es: profession.name_es,
            code: profession.cod,
            city: profession.city
          };
          data.works.push(professionData);
        }
      })
    );
  }

  return data;
};

//Updates
const changeProfession = async ({
  data_register,
  id_user,
  professionGroup,
  professionCode
}) => {
  let ret = false;
  let user = await User.findOne({ data_register });

  if (!user) return ret;

  //1. Search Profession
  const ExistsProfession = await Profession.findOne({
    $and: [
      { group: [professionGroup] },
      { cod: professionCode },
      { city: [cities.CARTAGENA] }
    ]
  });

  if (!ExistsProfession) return ret;
  //2. Search profession configured previously

  //This is fot multiple professions:
  /* let workman = await Workman.find({
    $and: [
      { id_user },
      {
        profession: `${ExistsProfession._id ? ExistsProfession._id : ''}`
      }
    ]
  }); */

  //This is for uniques professions:
  let workman = await Workman.find({ id_user });

  if (workman.length === 0) {
    //No exits work
    const newWorkman = new Workman({
      id_user,
      profession: ExistsProfession._id,
      status: true
    });

    await newWorkman.save(err => {
      if (err) {
        console.log(err);
      }
    });
    ret = true;
  } else {
    await Workman.updateOne(
      { id_user },
      { $set: { profession: ExistsProfession._id } }
    );
    ret = true;
  }

  return ret;
};

const changeInformation = async ({
  data_register,
  firstName,
  lastName,
  email,
  phone,
  address
}) => {
  let ret = false;
  let user = await User.findOne({ data_register });

  if (!user) return ret;

  let fn = firstName || user.firstName,
    ln = lastName || user.lastName;
  user.firstName = fn;
  user.lastName = ln;
  user.name = `${fn} ${ln}`;

  //email and phone
  let em = email || user.email,
    ph = phone || user.phone
    ad = address || user.address;

  user.email = em;
  user.phone = ph;
  user.address = ad;

  //---------------
  await user.save();
  ret = true;
  return ret;
};

module.exports = { changeProfession, getWorkerData, changeInformation };
