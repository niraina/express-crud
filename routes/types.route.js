const express = require('express')
const { getAllTypes, getType, addType, editType, deleteType } = require('../controllers/types.controller')

const router = express.Router()

router.get("/", getAllTypes)
router.get("/:id", getType)
router.post('/', addType)
router.put('/:id', editType)
router.delete('/:id', deleteType)

module.exports = router