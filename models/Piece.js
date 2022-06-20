const mongoose = require('mongoose')

const Piece = mongoose.model('Piece', {
    id: String,
    url: String
})



module.exports = Piece