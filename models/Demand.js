const mongoose = require('mongoose')

const Demand = mongoose.model('Demand', {
    id: String,
    clientId: String,
    productStatus: Number,
    description: String
})



module.exports = Demand