const {Sequelize, sequelize} = require('./db.js');

const Quote = sequelize.define('quotes', {
  name: Sequelize.STRING,
  quote: Sequelize.STRING,
  
});

module.exports = { Quote };