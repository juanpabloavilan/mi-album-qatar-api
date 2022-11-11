const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    idPropietario: {
        type: String,
        require: true
    },
    laminas: {
        type: Array,
        require: true
    }
})

module.exports = mongoose.model('Album', albumSchema)