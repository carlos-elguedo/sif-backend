const { GraphQLDate, GraphQLDateTime } = require('graphql-iso-date');

module.exports = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
  Query: {
    searchWorkers: async (parent, { data = {} }, { authInfo, dataSources }) => {
      const {
        limit = 10,
        offset = 0,
        q = '',
        sortBy = 'firstName',
        order = 'asc',
        searchBy
      } = data;

      const { id } = authInfo;

      const response = await dataSources.SIFApiRestCore.searchWorkers({
        q,
        order,
        sortBy,
        offset,
        limit,
        searchBy
      });

      return {
        workers: response.workers,
        offset: response.offset,
        limit: response.limit,
        size: response.size
      };
    }
  }
};
