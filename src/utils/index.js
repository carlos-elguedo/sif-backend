function getUserType(user) {
  let redirect = '';
  switch (+user) {
    case 1:
      redirect = 'client';
      break;
    case 2:
      redirect = 'worker';
      break;
    default:
      console.log('the user type is invalid');
  }
  return redirect;
}

/**
 * Transform an object to string with query params format.
 * Doesn't takes into accout empty strings or undefined values.
 * e.g. {providerTVId: "123", limit:10, param: ""}
 *  returns "providerTVId=123&limit=10"
 *
 * @param {object} params
 *
 * @returns {string}
 */
const stringifyQueryParams = params => {
  const queryString = Object.keys(params).reduce((query, currentKey) => {
    if (params[currentKey] !== '' && params[currentKey] !== undefined)
      query.push(`${currentKey}=${params[currentKey]}`);
    return query;
  }, []);
  return queryString.join('&');
};

const mapResultsWorkers = data => {
  const result = data.map(ele => {
    const { user_data, profession_data } = ele;
    return {
      id: ele._id,
      idUser: ele.id_user,
      name: user_data[0].name,
      status: ele.status,
      data_register: user_data[0].data_register,
      type: user_data[0].type,
      firstName: user_data[0].firstName,
      lastName: user_data[0].lastName,
      email: user_data[0].email,
      phone: user_data[0].phone,
      address: user_data[0].address,
      profileImage: user_data[0].profileImage,
      profession: {
        id: profession_data[0]._id,
        codeGroup: profession_data[0].group.toString(),
        name_es: profession_data[0].name_es,
        name_en: profession_data[0].name_en,
        cod: profession_data[0].cod,
        description: profession_data[0].description,
        city: profession_data[0].city[0]
      }
    };
  });

  return result;
};

module.exports = { getUserType, stringifyQueryParams, mapResultsWorkers };
