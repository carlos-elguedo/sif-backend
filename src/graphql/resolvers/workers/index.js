const { GraphQLDate, GraphQLDateTime } = require('graphql-iso-date');

/* const {
  mapCustomLicense,
  mapLicenses,
  mapPosthireLicenses,
  mapEmployees
} = require('../utils'); */

module.exports = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Query: {
    searchWorkers: async (
      parent,
      { data = {} },
      { authInfo, dataSources }
    ) => {
      const {
        limit = 10,
        offset = 0,
        q = '',
        sortBy = 'firstName',
        order = 'asc'
      } = data;

      const {
        id,
      } = authInfo;

      const response = await dataSources.SIFApiRestCore.searchWorkers({
        q,
        order,
        sortBy,
        offset,
        limit
      });
      console.log("response", response)

      //const licenses = mapCustomLicense(response);

      return {
        /* employees: mapEmployees(response.items),
        licenses, */
        offset: response.offset,
        limit: response.limit,
        size: response.size
      };
    }
  }
};
