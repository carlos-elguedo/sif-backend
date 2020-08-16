/*
mongodb://<dbuser>:<dbpassword>@ds131942.mlab.com:31942/sif
mongodb://sif-root:sif-root-2018@ds131942.mlab.com:31942/sif

mongodb://localhost:27017/sif
*/
module.exports = {
  DATABASE_URL: 'mongodb://localhost:27017/sif',
  SIF_API_REST: 'http://localhost:3001/api/rest',
  GRAPHQL_PLAYGROUND_ENABLED: true,
  GRAPHQL_INSTROSPECTION_ENABLED: true,
  GRAPHQL_UPLOADS_ENABLE: false
};