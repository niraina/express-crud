/**Import des modules necessaires */
const express = require('express')

const Categorie = require('../models/categories.model')

exports.getAllCategories =  (req, res) => {
    Categorie.findAll()
        .then(categories => res.json({data: categories}))
        .catch(err => res.status(500).json({ message: 'Database error', error: err }))
}

exports.getCategorie = (req, res) => {
    //verification de l'ID
    let categorieId = parseInt(req.params.id)
    if(!categorieId) {
        return res.json(400).json({ message: "Missing Parameter" })
    }

    Categorie.findOne({ where: {id: categorieId}, raw: true})
        .then(categorie => {
            if(categorie === null) {
                return res.json(404).json({message: 'This categorie does not exist !'})
            }

            return res.json({data: categorie})
        })
        .catch(err => res.status(500).json({ message: 'Database error', error: err }))
}

exports.addCategorie = async(req, res) => {
    const {label} = req.body
    if(!label) {
        return res.status(400).json({message: 'Missing data'})
    }

    const categorie =  await Categorie.create({
        label: req.body.label,
    })

    res.status(200).json(categorie);
}

module.exports.editCategorie = async (req, res) => {
    const categorieId = parseInt(req.params.id);
    const categorie = await Categorie.findOne({ where: { id: categorieId } });

    if (!categorie) {
        return res.status(400).json({ message: "Cette catégorie n'existe pas !" });
    }

    const updateCategorie = await categorie.update(req.body);

    res.status(200).json(updateCategorie);
};


module.exports.deleteCategorie = async (req, res) => {
    const categorieId = parseInt(req.params.id);
    const categorie = await Categorie.findOne({ where: { id: categorieId } })

    if(!categorie) {
        res.status(400).json({message: "Ce categorie n'existe pas!"})
    }

    await categorie.destroy(categorie);
    res.status(200).json(`Suppression effectuer avec succés`)
}