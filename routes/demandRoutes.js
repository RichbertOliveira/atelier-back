const router = require('express').Router()
const Demand = require('../models/Demand')
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const BASEURL = "../demands/";

// create
router.post('/create', async (req, res) => {
    const {clientId, productStatus, description} = req.body;
    
    if(!clientId) {
        res.status(422).json({error: 'O cliente é obrigatório!'});
    }

    const id = new mongoose.Types.ObjectId();

    const demand = {
        id,
        clientId,
        productStatus, 
        description
    };

    try {
        await Demand.create(demand);

        res.status(201).json({message: 'Demanda inserida!'});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
})

// get by client
router.get('/getDemandByClient', async (req, res) => {
    const clientId = req.query.clientId;
    
    const demand = await Demand.find({ clientId: clientId });
    
    if(demand.length == 0){
        res.status(422).json({message: 'Cliente sem demandas cadastradas!'});
        return;
    }

    try {
        res.status(200).json(demand);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

// get all
router.get('/getAllDemands', async (req, res) => {
    const demand = await Demand.find({});

    if(demand.length == 0){
        res.status(422).json({message: 'Nenhuma demanda cadastrada!'});
        return;
    }

    try {
        res.status(200).json(demand);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

// get specific demand
router.get('/getOneDemands', async (req, res) => {
    const clientId = req.query.clientId;
    const id = req.query.id;

    const demand = await Demand.findOne({ clientId: clientId, id: id });

    if(demand.length == 0){
        res.status(422).json({message: 'Demanda inexistente!'});
        return;
    }

    try {
        res.status(200).json(demand)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

// delete
router.delete('/delete', async (req, res) => {
    const clientId = req.query.clientId;
    const id = req.query.id
    
    const demand = await Demand.findOne({ clientId: clientId, id: id });

    if(demand.length == 0){
        res.status(422).json({message: 'Demanda inexistente!'});
        return;
    }

    try {
        await Demand.deleteOne({ clientId: clientId, id: id });

        res.status(200).json({ message: 'Demanda removida!' });
    } catch (error) {
        res.status(500).json({error: error});
    }

});

// update
router.patch('/:id', async (req, res) => {
    let {id, clientId, productStatus, url} = req.body;

    url = BASEURL + url;

    const demand = {
        id,
        clientId,
        productStatus,
        url,
    };

    try {
        const updatedDemand = await Demand.updateOne({id, clientId}, demand);

        if(updatedDemand.matchedCount === 0) {
            res.status(422).json({message: 'Demanda não encontrada!'});
            return;
        }

        res.status(200).json(demand);
    } catch (error) {
        res.status(500).json({error: error});
    }

});

module.exports = router
