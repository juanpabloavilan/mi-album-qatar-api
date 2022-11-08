const mongoose = require('mongoose');

const laminaSchema = new mongoose.Schema({    
    adquirida: {
        type: String,
        required: true,
        default: false
    },
    idRef: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Lamina', laminaSchema)