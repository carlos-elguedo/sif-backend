module.exports = {
  DATABASE_URL: 'mongodb://localhost:27017/sif',
  //DATABASE_URL: 'mongodb://sif_user_dev:sif2020+@sif-shard-00-00.yergx.mongodb.net:27017,sif-shard-00-01.yergx.mongodb.net:27017,sif-shard-00-02.yergx.mongodb.net:27017/sif?ssl=true&replicaSet=atlas-2mjy3o-shard-0&authSource=admin&retryWrites=true&w=majority',
  SIF_API_REST: 'http://localhost:3001/api/rest',
  GRAPHQL_PLAYGROUND_ENABLED: true,
  GRAPHQL_INSTROSPECTION_ENABLED: true,
  GRAPHQL_UPLOADS_ENABLE: false
};