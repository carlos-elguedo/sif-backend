const path = require('path');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');

const typesArray = fileLoader(path.join(__dirname, '*.gql'), {
  recursive: true
});

module.exports = mergeTypes(typesArray, { all: true });
