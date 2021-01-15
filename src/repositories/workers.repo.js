/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge ofacced and modify the data in the database
 */

const Workman = require('../models/Workman');
const Profession = require('../models/Profession');
const { mapResultsWorkers } = require('../utils');
const userRepository = require('./users.repo');

const searchWorkers = async ({
  q,
  offset,
  order,
  limit,
  sortBy,
  lang,
  searchBy
}) => {
  let data = [];
  let SEARCH_NAME = `name_${lang}`;

  /**1. Buscar las professions por el q
  2. Eso retornara un array de professions
  3. Tomamos ese array y buscamos los workers que tengan ese array
  4. Ordenamos los workers
  5. Aplicamos el sortBy
  6. Aplicamos el order
  7. Aplicamos el limit
  8. Se retorna un extra array buscando el q en la collection categoria
  9. Retorna la data*/

  if (!q) return data;
  let professionsFound = [];
  switch (searchBy) {
    case 'profession':
      professionsFound = await Profession.find({
        name_es: { $regex: q.toUpperCase() }
      }).select([SEARCH_NAME]);
      break;
    case 'categorie':
      professionsFound = await Profession.find({
        group: { $in: [q] }
      }).select([SEARCH_NAME]);
      break;
    default:
  }

  if (!professionsFound.length) return data;

  const professionsIds = professionsFound.map(item => {
    return item._id;
  });

  const workManFound = await Workman.aggregate([
    {
      $match: {
        profession: { $in: professionsIds }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'id_user',
        foreignField: '_id',
        as: 'user_data'
      }
    },
    {
      $lookup: {
        from: 'professions',
        localField: 'profession',
        foreignField: '_id',
        as: 'profession_data'
      }
    }
  ]);

  if (!workManFound.length) return data;

  data = mapResultsWorkers(workManFound);

  return data;
};

const getProfile = async idWorkman => {
  const workerInfo = await Workman.findById(idWorkman);

  if (!workerInfo) return {};

  const { id_user } = workerInfo;

  const workerData = await userRepository.getWorkerData(id_user);

  if (!workerInfo) return {};

  const banner = workerData.works.length ? workerData.works[0].code : '';

  return {
    banner,
    profileImage: workerData.profileImage,
    info: workerData
  };
};

module.exports = {
  searchWorkers,
  getProfile
};
