const express = require('express')
const mongoose = require('mongoose')
const { restart } = require('nodemon')
const app = express()
var cors = require('cors')

app.options('*', cors())

const User = require('./models/User')

app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
        res.header("Access-Control-Allow-Headers", 'Content-Type');
        res.header("Access-Control-Allow-Credentials", 'true');
        app.use(cors());
        next();
    },
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

const userRoutes = require('./routes/userRoutes')
const demandRoutes = require('./routes/demandRoutes')
const pieceRoutes = require('./routes/pieceRoutes')

app.use(
    '/user', userRoutes,
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
        res.header("Access-Control-Allow-Headers", 'Content-Type');
        res.header("Access-Control-Allow-Credentials", 'true');
        app.use(cors());
        next();
    }    
)

app.use(
    '/demand', demandRoutes,
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
        res.header("Access-Control-Allow-Headers", 'Content-Type');
        res.header("Access-Control-Allow-Credentials", 'true');
        app.use(cors());
        next();
    }    
)

app.use(
    '/piece', pieceRoutes,
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
        res.header("Access-Control-Allow-Headers", 'Content-Type');
        res.header("Access-Control-Allow-Credentials", 'true');
        app.use(cors());
        next();
    }    
)


app.get('/', (req, res) => {
    res.send('API Funcionando')
})

const DB_USER = 'atelieradmin'
const DB_PASSWORD = encodeURIComponent('tis3admin')
//mongodb+srv://atelieradmin:tis3admin@atelierdb.2nvsz.mongodb.net/atelierBelMadeira?retryWrites=true&w=majority
mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@atelierdb.2nvsz.mongodb.net/atelierBelMadeira?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Conectado com sucesso");
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err);
    })
