const { Sequelize } = require("sequelize");
const config = require("../config/database.js");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.url, {
  ...dbConfig,
  logging: false,
});

const db = {
  sequelize,
  Sequelize,
};

module.exports = db;
