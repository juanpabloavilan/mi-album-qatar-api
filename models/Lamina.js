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

laminaSchema.methods = {
    compare: function (a, b) {
        if (a.adquirida == b.adquirida) {
            return 0;
        } else if (a.adquirida) {
            return -1;
        }
        return 1;
    }
}

module.exports = mongoose.model('Lamina', laminaSchema)