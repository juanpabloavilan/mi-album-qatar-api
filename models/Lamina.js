const mongoose = require('mongoose')

const laminaSchema = new mongoose.Schema({    
    ownerId: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
        default: 1
    }

})

laminaSchema.methods.findLaminaRefInfo = function(){
    return mongoose.model('LaminaRef').findOne({numero: this.numero})
}

module.exports = mongoose.model('Lamina', laminaSchema)