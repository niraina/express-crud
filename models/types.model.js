const { DataTypes } = require("sequelize")
const DB = require('../db.config')

const Types = DB.define('Types', {
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
// Types.sync()
// Types.sync({force: true})
Types.sync({alter: true})

module.exports = Types