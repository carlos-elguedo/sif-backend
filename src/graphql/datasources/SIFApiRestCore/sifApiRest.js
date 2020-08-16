const { RESTDataSource } = require('apollo-datasource-rest');
const config = require('../../..//config/config');
const { stringifyQueryParams } = require('../../../utils');

module.exports = class SIFApiRestCore extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = config.SIF_API_REST;
  }

  async searchWorkers({
    limit = 10,
    offset = 0,
    order = 'asc',
    q = '',
    sortBy = 'firstName'
  }) {
    return this.get(
      `/worker/search?` +
        stringifyQueryParams({
          limit,
          offset,
          order,
          q,
          sortBy
        })
    );
  }
};
