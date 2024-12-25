require("dotenv").config();

const development = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: "mysql",
  timezone: "+09:00",
};

const production = {
  username: process.env.DB_PROD_USERNAME,
  password: process.env.DB_PROD_PASSWORD,
  database: process.env.DB_PROD_DATABASE,
  host: process.env.DB_PROD_HOST,
  dialect: "mysql",
  timezone: "+09:00",
};

module.exports = { development, production };
