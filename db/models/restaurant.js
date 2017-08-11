const db = require("../db");
const Sequelize = require("sequelize");

module.exports = db.define("restaurant", {
  name: Sequelize.STRING,
  cuisine: Sequelize.STRING,
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
});
