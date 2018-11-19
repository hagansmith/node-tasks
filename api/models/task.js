const db = require('../db')
const Sequelize = require('sequelize')

const Task = db.define('task', {
    // id assumed as pk by sequelize by default
    name: {type: Sequelize.STRING(50), allowNull: false},
    completed: {type: Sequelize.BOOLEAN, defaultValue: false}
});

module.exports = Task