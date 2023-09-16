const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config();
/**Import de la connexion a la DB */
let DB = require('./db.config')

/**Initialisation de l'API */
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/categories', require('./routes/categories.route'))
app.use('/types', require('./routes/types.route'))
app.use('/food', require('./routes/food.route'))



/**Start server avec teste DB*/
DB.authenticate()
    .then(() => console.log(`DB connexion OK!`))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running in port ${process.env.SERVER_PORT}`);
        })
    })
    .catch(err => console.log(`DB error`, err))