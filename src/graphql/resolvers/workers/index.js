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
        sortBy = '',
        order = 'asc'
      } = data;

      console.log("authInfo", authInfo)
      const {
        id: userId,
        employerId,
        canViewAllEmployees,
        canViewUnlicensedEmployees: canViewUnlicensed
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
