// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/koroibos_olympic_development',
    migrations: {
      directory: './db/migrations'
    },
    seeds :{
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/koroibos_olympic_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds :{
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      directory: './db/migrations'
    },
    seeds :{
      directory: './db/seeds/dev'
    }
  }

};
