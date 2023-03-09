const {User} = require('./User');
const {sequelize, Sequelize} = require('./db');
const {Quote} = require('./quotes')

Quote.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'})
User.hasMany(Quote, {foreignKey: 'userId', onDelete: 'CASCADE'})

module.exports = {
    User,
    Quote,
    sequelize,
    Sequelize
};
