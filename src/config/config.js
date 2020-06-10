const dotenv = require('dotenv');

dotenv.config();

const databaseEnvDetails = {
  username: process.env.DB_CONFIG_USERNAME,
  password: process.env.DB_CONFIG_PASSWORD,
  host: process.env.DB_CONFIG_HOST,
  port: process.env.DB_CONFIG_PORT,
  dialect: 'postgres',
  logging: false,
};

const config = {
  development: {
    database: process.env.DB_CONFIG_DATABASE,
    ...databaseEnvDetails,
  },
  test: {
    database: process.env.DB_CONFIG_TEST_DATABASE,
    ...databaseEnvDetails
  },
  production: {
    use_env_variable:  'DATABASE_URL',
    dialect: 'postgres',
  }
};

module.exports = config;
