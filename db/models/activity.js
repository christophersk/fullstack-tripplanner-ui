const db = require("../db");
const Sequelize = require("sequelize");

module.exports = db.define("activity", {
  name: Sequelize.STRING,
  age_range: {
    type: Sequelize.STRING
  }
});
