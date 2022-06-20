const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require("bcryptjs");

// register
router.post('/register', async (req, res) => {
    const {name, password, admin, mail} = req.body
    console.log(req.body)
    if(!mail) {
        res.status(422).json({error: 'E-mail é obrigatório'})
    }

    const user = {
        name, 
        password,
        admin, 
        mail
    }

    try {
        if(await User.findOne({ mail })){
            return res.status(400).send({ error: 'Usuário já existe.' })
        }
        await User.create(user)

        res.status(201).json({message: 'user inserido'})
        
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            mail: req.body.mail,
            password: req.body.password
        });

        if (!user) {
            return res.status(404).send({ message: "Usuário  ou senha inválidos!" })
        } else {
            return res.status(201).send({ user: {
                mail: user.mail,
                admin: user.admin,
                auth: true
            }});
        }
          
        
    }
 catch (error) {
        res.status(500).json({error: error})
    }
})

// read
router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

router.get('/getAllUsersNonAdmins', async (req, res) => {
    try {
        const users = await User.find({admin: false})

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

// get by id
router.get('/:id', async (req, res) => {
    //extrair o dado da requisição
    const id = req.params.id
    if(!User){
        res.status(422).json({message: 'user não encontrado'})
        return
    }

    try {
        const user = await User.findOne({_id: id})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// update
router.post('/updateUser', async (req, res) => {
    const mail = req.params.mail;
    const admin = req.params.admin;
    const name = req.params.name;
    const password = req.params.password;

    let user = await User.findOne({mail: mail});
    
    if(!user) {
        return res.status(404).send({ message: "Usuário não encontrado!" })
    }

    const userChange = {
        mail,
        admin,
        name,
        password
    };

    try {
        const updatedUser = await User.updateOne({mail: mail}, userChange)

        if(updatedUser.matchedCount === 0) {
            res.status(422).json({message: 'user não encontrado'})
            return
        }
        res.status(200).json(userChange)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

// delete
router.delete('/deleteUser', async (req, res) => {
    const id = req.params.id

    const user = await Person.findOne({ _id: id })

    if(!user){
        res.status(422).json({message: 'user não encontrado'})
        return
    }

    try {
        await User.deleteOne({ _id: id })

        res.status(200).json({ message: 'user removido' })
    } catch (error) {
        res.status(500).json({error: error})
    }


})

module.exports = router
