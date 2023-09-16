/**Import des modules necessaires */
const express = require('express')

const Types = require('../models/types.model')

exports.getAllTypes =  (req, res) => {
    Types.findAll()
        .then(types => res.json({data: types}))
        .catch(err => res.status(500).json({ message: 'Database error', error: err }))
}

exports.getType = (req, res) => {
    //verification de l'ID
    let typeId = parseInt(req.params.id)
    if(!typeId) {
        return res.json(400).json({ message: "Missing Parameter" })
    }

    Types.findOne({ where: {id: typeId}, raw: true})
        .then(type => {
            if(type === null) {
                return res.json(404).json({message: 'This type does not exist !'})
            }

            return res.json({data: type})
        })
        .catch(err => res.status(500).json({ message: 'Database error', error: err }))
}

exports.addType = async(req, res) => {
    const {label} = req.body
    if(!label) {
        return res.status(400).json({message: 'Missing data'})
    }

    const type =  await Types.create({
        label: req.body.label,
    })

    res.status(200).json(type);
}

module.exports.editType = async (req, res) => {
    const typeId = parseInt(req.params.id);
    const type = await Types.findOne({ where: { id: typeId } });

    if (!type) {
        return res.status(400).json({ message: "Cette catégorie n'existe pas !" });
    }

    const updateType = await type.update(req.body);

    res.status(200).json(updateType);
};


module.exports.deleteType = async (req, res) => {
    const typeId = parseInt(req.params.id);
    const type = await Types.findOne({ where: { id: typeId } })

    if(!type) {
        res.status(400).json({message: "Ce type n'existe pas!"})
    }

    await type.destroy(type);
    res.status(200).json(`Suppression effectuer avec succés`)
}