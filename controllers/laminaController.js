const { findOneAndUpdate } = require('moongose/models/user_model')
const Lamina = require('../models/Lamina')

//LAMINA: ENLACE DE UN USUARIO CON UNA REFERENCIA DE LAMINA
exports.getLamina = (req, res) => {
    id = req.params.id
    if (!assertObjectId(id)) { // unvalid ObjectId, bad query.
        res.status(400).json({ message: "Invalid id request" })
        return
    }
    // valid ObjectId, proceed with `findById` call
    findById(id, (err, lamina) => {
        err ?
            res.status(500).json({ message: err.message }) :
            res.json(lamina);
    });
}

exports.addLamina = (req, res) => {
    if (!res.ref) {  //Validate Ref Middleware
        return res.status(400).json({ err: "Reference doesnt exist" })
    } else if (res.lamina) { //Validate Lamina Middleware
        return res.status(400).json({ err: "You already have this lamina" })
    }
    const reqLamina = new Lamina(req.body);
    reqLamina.save((err, lamina) => {
        if (err) {
            res.status(400).json({ err: err.message })
            return
        }
        res.status(201).json(lamina)
    });
}


exports.deleteLamina= (req, res) => {
    id = req.params.id
    if (!assertObjectId(id)) {
        res.status(400).json({ err: "Invalid id" })
        return
    }
    findByIdAndDelete(id, (err, success) => {
        if (err) {
            res.status(500).json({ err: err.message })
        }
        success == null ? res.status(404).json({ error: 'invalid id' }) :
            res.json({ msg: id + ' deleted' })
    })
}

exports.increaseLaminaQty = (req, res) => {
    id = req.params.id
    findByIdAndUpdate(id, { $inc: { cantidad: 1 } },{ new: true }, (err, success) => {
        if (err) {
            res.status(500).json({ err: err.message })
            return
        }
        updateResult = success == null ?
            res.status(404).json({ error: 'invalid id' }) :
            res.json(success)
    })
}

exports.decreaseLaminaQty = (req, res) => {
    id = req.params.id
    findByIdAndUpdate(id, { $inc: { cantidad: -1 } }, {new: true} , (err, success) => {
        if (err) {
            res.status(500).json({ err: err.message })
            return
        } else if(success == null){
            res.status(404).json({ error: 'invalid id' })
            return
        } 
        success.cantidad <= 0 ? this.deleteLamina(req, res) : res.json(success)
    })
}


exports.validateNewLamina = (req, res, next) => {
    reqRef = req.body.idRef
    reqOwner = req.body.ownerId
    findOne({ idRef: reqRef, ownerId: reqOwner }, (err, userLamina) => {
        if (err) {
            res.err = err.message
        }
        res.lamina = userLamina
        next()
    })
}

//Assertions
function assertObjectId(id) {
    return id.match(/^[0-9a-fA-F]{24}$/) != null
}
