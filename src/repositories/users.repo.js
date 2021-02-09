/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge ofacced and modify the data in the database
 */

const User = require('../models/User');
const Workman = require('../models/Workman');
const Profession = require('../models/Profession');
const ProfessionGroup = require('../models/ProfessionGroup');

const moment = require('moment');
const { cities } = require('../constants');

//Get's
const getWorkerData = async id => {
  let data = {},
    mainWork = true;
  let user = await User.findOne({ _id: id });

  if (!user) return {};

  //user data
  data.name = user.name || '';
  data.email = user.email || '';
  data.phone = user.phone || '';
  data.firstName = user.firstName || '';
  data.lastName = user.lastName || '';
  data.age_count = Math.abs(moment(user.age).diff(moment(), 'years'));
  data.address = user.address || '';
  data.type = user.type;
  data.profileImage = user.profileImage || '';
  data.disponibily = user.status || false;
  data.id = user._id;

  //worker data
  let works = await Workman.find({ id_user: id });
  data.works = [];

  if (works) {
    await Promise.all(
      works.map(async work => {
        let profession = await Profession.findById(work.profession);
        let categorie = await ProfessionGroup.findOne({
          cod: profession.group[0] || '---'
        });

        if (profession && categorie) {
          let professionData = {
            group: profession.group,
            name_es: profession.name_es,
            name_en: profession.name_en,
            code: profession.cod,
            city: profession.city
          };
          data.works.push(professionData);
          //Added the defult work
          if (mainWork) {
            data.professionName_es = profession.name_es;
            data.professionName_en = profession.name_en;
            data.categorieName_es = categorie.name_es;
            data.categorieName_en = categorie.name_en;
            mainWork = false;
          }
        }
      })
    );
  }

  return data;
};

const getClientData = async id => {
  let data = {};
  let user = await User.findOne({ _id: id });
  if (!user) return {};
  //user data
  data.data_register = user.data_register || '';
  data.name = user.name || '';
  data.email = user.email || '';
  data.phone = user.phone || '';
  data.firstName = user.firstName || '';
  data.lastName = user.lastName || '';
  data.age_count = Math.abs(moment(user.age).diff(moment(), 'years'));
  data.address = user.address || '';
  data.type = user.type;
  data.profileImage = user.profileImage || '';
  data.id = user._id || '';
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

const changeImageProfile = async (id_user, filename) => {
  let user = await User.findOne({ _id: id_user });
  if (!user) return false;
  user.profileImage = filename;
  await user.save();
  return true;
};

const changeInformation = async ({
  data_register,
  firstName,
  lastName,
  email,
  phone,
  address,
  disponibility = 'disponible',
  areaCodePhone = '',
  id = false
}) => {
  let ret = false;
  const condition = id ? { _id: id } : { data_register };
  let user = await User.findOne(condition);
  if (!user) return ret;

  let fn = firstName || user.firstName,
    ln = lastName || user.lastName;
  user.firstName = fn;
  user.lastName = ln;
  user.name = `${fn} ${ln}`;

  //email and phone
  let em = email || user.email,
    ph = phone || user.phone;
  ad = address || user.address;

  user.email = em;
  user.phone = ph;
  user.address = ad;

  //disponibility
  let disp = disponibility === 'disponible' ? true : false;
  user.status = disp; 

  //---------------
  await user.save();
  ret = true;
  return ret;
};

module.exports = {
  changeProfession,
  getWorkerData,
  changeInformation,
  changeImageProfile,
  getClientData
};
