const express = require('express')
const { getAllFood, getFood, addFood, editFood, deleteFood } = require('../controllers/food.controller')

const router = express.Router()

router.get("/", getAllFood)
router.get("/:id", getFood)
router.post('/', addFood)
router.put('/:id', editFood)
router.delete('/:id', deleteFood)

module.exports = router