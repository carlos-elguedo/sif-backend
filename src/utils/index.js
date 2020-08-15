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

module.exports = { getUserType, stringifyQueryParams };
