const db = require("../db");
const Sequelize = require("sequelize");

module.exports = db.define("hotel", {
  name: Sequelize.STRING,
  num_stars: {
    type: Sequelize.FLOAT,
    validate: {
      min: 1,
      max: 5
    }
  },
  amenities: Sequelize.STRING,
});
