const {User} = require('./User');
const {sequelize, Sequelize} = require('./db');
const {Quote} = require('./quotes')

Quote.belongsTo(User, {foreignKey: 'userId'})
User.hasMany(Quote)

module.exports = {
    User,
    Quote,
    sequelize,
    Sequelize
};
