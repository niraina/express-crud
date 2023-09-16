const { DataTypes } = require("sequelize")
const DB = require('../db.config')

const Categories = DB.define('Categories', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    label: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    }
})

/**Synchronisation du model */
// Categories.sync()
// Categories.sync({force: true})
Categories.sync({alter: true})

module.exports = Categories