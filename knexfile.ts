import * as dotenv from "dotenv";
dotenv.config();

interface KnexConfig {
  [key: string]: object;
}
// Update with your config settings.
export const config:KnexConfig  = {

  development: {
    client: process.env.CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      extension: 'ts',
      tableName: "knex_migrations",
      directory: `${ __dirname }/src/database/migrations`
    },
    seeds: {
      extension: 'ts',
      directory: `${ __dirname }/src/database/seeds`
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};


export default config;
