const mongoose = require('mongoose');

const laminaRefSchema = new mongoose.Schema({    
    equipo: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true,
        default: 'no_img'
    },
    numero: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('LaminaRef', laminaRefSchema)