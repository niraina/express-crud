/**Import des modules necessaires */
const { DataTypes } = require("sequelize")
const DB = require('../db.config')

/**Definition du model User */
const Food = DB.define('Food', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    designation: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    recette: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: true,
    },
})

/**Synchronisation du model */
// Food.sync()
// Food.sync({force: true})
Food.sync({alter: true})

module.exports = Food