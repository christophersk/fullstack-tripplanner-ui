const { Activity, Place, Restaurant, Hotel } = require("./models");
const db = require("./db");

Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);

module.exports = {
  db,
  Activity,
  Hotel,
  Place,
  Restaurant
};
