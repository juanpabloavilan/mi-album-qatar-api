const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    laminasMap: {
        type: Map,
        require: true
    }
})

module.exports = mongoose.model('Album', albumSchema)