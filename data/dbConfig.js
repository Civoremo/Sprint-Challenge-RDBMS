const knex = require('knex');
const knnexConfig = require('../knexfile.js');

module.exports = knex(knnexConfig.development);