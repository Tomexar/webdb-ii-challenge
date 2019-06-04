const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/zooz.db3',
    },
    useNullAsDefault: true, 
    debug: true,
  };

  const db = knex(knexConfig);

  module.exports = {
      find,
      findById
  }

  function find(){
      return db('bears')
  }

  function findById(id) {
    return db('bears')
      .where({ id })
      .first();
  }