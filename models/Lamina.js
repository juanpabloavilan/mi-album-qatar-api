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

laminaSchema.methods = {
    changeOwner: function (newOwnerId) {  //The owner id has to be validated first to be changed
        this.idOwner = newOwnerId;
    }
}

module.exports = mongoose.model('Lamina', laminaSchema)