const { Sequelize } = require('sequelize')

/**Connexion à la base de données */
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
        timezone: '+03:00',
    }
)

/**Synchronisation des modeles */
sequelize.sync(err => {
    console.log('Database error', err);
})

module.exports = sequelize