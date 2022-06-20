const router = require('express').Router();
const Piece = require('../models/Piece');
const bcrypt = require("bcryptjs");
const BASEURL = "../demands/";

// create
router.post('/create', async (req, res) => {
    let {id, url} = req.body;
    
    if(!url) {
        res.status(422).json({error: 'A url do arquivo não pode ser nula!'});
    }

    url = BASEURL + url;

    const piece = {
        id, 
        url
    };

    try {
        if(await Piece.findOne({ url })){
            return res.status(400).send({ error: 'A url já está sendo usada!' });
        }
        await Piece.create(piece);

        res.status(201).json({message: 'Obra inserida!'});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
});

// get by url
router.get('/getOnePiece', async (req, res) => {
    const url = req.query.url;

    const piece = await Piece.findOne({ url: url });

    if(piece.length == 0){
        res.status(422).json({message: 'Obra não encontrada!'});
        return;
    }

    try {
        res.status(200).json(piece);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

// get all
router.get('/getAllPieces', async (req, res) => {
    const piece = await Piece.find({});

    if(piece.length == 0){
        res.status(422).json({message: 'Nenhuma obra cadastrada!'});
        return;
    }

    try {
        res.status(200).json(piece);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

// delete
router.delete('/delete', async (req, res) => {
    let {url} = req.query;

    const piece = await Piece.findOne({ url: url });

    if(piece.length == 0){
        res.status(422).json({message: 'Obra não encontrada!'});
        return;
    }

    try {
        await Piece.deleteOne({ url: url });

        res.status(200).json({ message: 'Obra removida!' });
    } catch (error) {
        res.status(500).json({error: error});
    }

});

module.exports = router
