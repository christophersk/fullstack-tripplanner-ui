const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost/staticui");

module.exports = db;
