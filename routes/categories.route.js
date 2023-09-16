const express = require('express')
const { getAllCategories, getCategorie, addCategorie, editCategorie, deleteCategorie } = require('../controllers/categories.controller')

const router = express.Router()

router.get("/", getAllCategories)
router.get("/:id", getCategorie)
router.post('/', addCategorie)
router.put('/:id', editCategorie)
router.delete('/:id', deleteCategorie)

module.exports = router