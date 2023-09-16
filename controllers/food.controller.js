/**Import des modules necessaires */
const express = require('express')

const Food = require('../models/food.model')
const { Sequelize } = require('sequelize');
const { Op } = Sequelize;

exports.getAllFood = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchTerm = req.query.search;

    try {
        const offset = (page - 1) * limit;
        const whereClause = searchTerm
            ? {
                  [Op.or]: [
                      { designation: { [Op.like]: `%${searchTerm}%` } },
                      { price: { [Op.like]: `%${searchTerm}%` } },
                  ],
              }
            : {};

        // Utilisez findAll avec les options limit, offset et where pour paginer et filtrer les résultats
        const foods = await Food.findAll({
            where: whereClause,
            limit: limit,
            offset: offset,
        });

        // Comptez le nombre total d'éléments correspondant au terme de recherche (sans la pagination)
        const totalCount = await Food.count({
            where: whereClause,
        });

        const totalPages = Math.ceil(totalCount / limit);

        res.json({
            data: foods,
            page: page,
            totalPages: totalPages,
            totalCount: totalCount,
        });
    } catch (err) {
        res.status(500).json({ message: 'Database error', error: err });
    }
};

exports.getFood = (req, res) => {
    //verification de l'ID
    let foodId = parseInt(req.params.id)
    if(!foodId) {
        return res.json(400).json({ message: "Missing Parameter" })
    }

    Food.findOne({ where: {id: foodId}, raw: true})
        .then(food => {
            if(food === null) {
                return res.json(404).json({message: 'This food does not exist !'})
            }

            return res.json({data: food})
        })
        .catch(err => res.status(500).json({ message: 'Database error', error: err }))
}

exports.addFood = async(req, res) => {
    const {designation, price, recette} = req.body
    if(!designation || !price || !recette) {
        return res.status(400).json({message: 'Missing data'})
    }

    const food =  await Food.create({
        designation: req.body.designation,
        price: req.body.price,
        recette: req.body.recette,
    })

    res.status(200).json(food);
}

module.exports.editFood = async (req, res) => {
    const foodId = parseInt(req.params.id);
    const food = await Food.findOne({ where: { id: foodId } });

    if (!food) {
        return res.status(400).json({ message: "Cette food n'existe pas !" });
    }

    const updateFood = await food.update(req.body);

    res.status(200).json(updateFood);
};


module.exports.deleteFood = async (req, res) => {
    const foodId = parseInt(req.params.id);
    const food = await Food.findOne({ where: { id: foodId } })

    if(!food) {
        res.status(400).json({message: "Ce food n'existe pas!"})
    }

    await food.destroy(food);
    res.status(200).json(`Suppression effectuer avec succés`)
}