const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const errorHandler = require('./errors');
const config = require('../../config/config');

const { SIFApiRestCore } = require('../datasources');

const typeDefs = require('../schemas');
const resolvers = require('../resolvers');
const { auth } = require('../middlewares');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({
  schema,
  dataSources: () => ({
    SIFApiRestCore: new SIFApiRestCore()
  }),
  context: async ({ req }) => {
    return auth.contextBuilder({ req });
  },
  /* context: ({ req }) => {
    // Note! This example uses the `req` object to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they will vary for Express, Koa, Lambda, etc.!
    //
    // To find out the correct arguments for a specific integration,
    // see the `context` option in the API reference for `apollo-server`:
    // https://www.apollographql.com/docs/apollo-server/api/apollo-server/
    console.log('Estan llegando');
    // Get the user token from the headers.
    const token = req.headers.authorization || '';
    
 
    // try to retrieve a user with the token
    return throw new Error('Carlos')
    console.log('Estan pasandoo');
    //passportConfig.userIsAuthenticated
 
    // add the user to the context
    return { user };
  }, */
  formatError: err => {
    return errorHandler.buildStackTrace(err);
  },
  playground: config.GRAPHQL_PLAYGROUND_ENABLED,
  introspection: config.GRAPHQL_INSTROSPECTION_ENABLED,
  uploads: config.GRAPHQL_UPLOADS_ENABLE
});

module.exports = server;
