const {sequelize} = require('./db');
const {Quote} = require('./quotes.js');
const {quotes} = require('./seedData');

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await Quote.bulkCreate(quotes);
};

module.exports = seed;