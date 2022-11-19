const mongoose = require('mongoose');

const laminaSchema = new mongoose.Schema({    
    ownerId: {
        type: String,
        required: true
    },
    idRef: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        default: 1
    }
})

module.exports = mongoose.model('Lamina', laminaSchema)