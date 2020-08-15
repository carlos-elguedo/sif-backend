/*
mongodb://<dbuser>:<dbpassword>@ds131942.mlab.com:31942/sif
mongodb://sif-root:sif-root-2018@ds131942.mlab.com:31942/sif

mongodb://localhost:27017/sif
*/
module.exports = {
  DATABASE_URL: 'mongodb://localhost:27017/sif',
  SIF_API_REST: 'localhost:3001',
  GRAPHQL_PLAYGROUND_ENABLED: true,
  GRAPHQL_INSTROSPECTION_ENABLED: true,
  GRAPHQL_UPLOADS_ENABLE: false
};