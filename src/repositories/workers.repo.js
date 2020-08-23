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

const searchWorkers = async ({ q, offset, order, limit, sortBy, lang }) => {
  console.log('searchWorkers va a buscar -> q', q);
  let data = {};
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

  const professionsFound = await Profession.find({
    name_es: { $regex: q.toUpperCase() }
  }).select([SEARCH_NAME]);

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

  return data;
};

module.exports = {
  searchWorkers
};
