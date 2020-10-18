/**
 * @author Carlos Elguedo
 * @version 0.0.1
 * File in charge ofacced and modify the data in the database
 */

const Workman = require('../models/Workman');
const Profession = require('../models/Profession');
const { mapResultsWorkers } = require('../utils');

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
  console.log('q', q);

  let professionsFound = [];

  switch (searchBy) {
    case 'profession':
      console.log('Va a buscar por profession');
      professionsFound = await Profession.find({
        name_es: { $regex: q.toUpperCase() }
      }).select([SEARCH_NAME]);
      break;
    case 'categorie':
      console.log('Va a buscar por categoria');
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

module.exports = {
  searchWorkers
};
