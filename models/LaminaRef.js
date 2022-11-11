const mongoose = require('mongoose');

const laminaRefSchema = new mongoose.Schema({    
    cantidad: {
        type: Number,
        required: true,
        default: 0
    },
    nombreJugador: {
        type: String,
        required: true
    },
    imgData: {
        type: String,
        required: true,
        default: 'no_img'
    }
})

module.exports = mongoose.model('LaminaRef', laminaRefSchema)