const {sequelize} = require('./db');
const {Quote} = require('./quotes.js');
const {User} = require('./User.js');
const {quotes} = require('./seedData');
const {users} = require('./seedData');


const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await Quote.bulkCreate(quotes);
  await User.bulkCreate(users);
};

module.exports = seed;