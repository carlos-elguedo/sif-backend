const { mergeResolvers } = require('merge-graphql-schemas');

const workers = require('./workers');

const resolvers = [workers];

module.exports = mergeResolvers(resolvers);
