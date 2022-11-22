//const { findOneAndUpdate } = require('moongose/models/user_model')
const Lamina = require('../models/Lamina')
const { find } = require('../models/LaminaRef')

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
        console.log(res.lamina)
        res.in
        return res.status(400).json({ err: "You already have this lamina" })
    }
    const reqLamina = new Lamina(req.body);
    reqLamina.cantidad = 1
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

exports.increaseLaminaQty = async(req, res) => {
    const numero = req.params.numero
    const ownerId = req.params.ownerId
    
    if (!numero || !ownerId) return res.status(400).json({error: "Parameters not included"})
    try{
        //Find lamina 
       
        let lamina = await Lamina.findOne({numero, ownerId})
        lamina.cantidad += 1
        lamina = await lamina.save()

        const laminaRefInfo = await lamina.findLaminaRefInfo()
        
        return res.json({
            laminaRefInfo,
            lamina
        })

    }catch(e){
        return res.status(400).json({
            error: "Lamina no encontrada"
        })
    }
    
}

exports.decreaseLaminaQty = async(req, res) => {
    const numero = req.params.numero
    const ownerId = req.params.ownerId
    
    if (!numero || !ownerId) return res.status(400).json({error: "Parameters not included"})
    try{
        //Find lamina 
        let lamina = await Lamina.findOne({numero, ownerId})
        if(lamina.cantidad <= 1) {
            return res.status(400).json({error: "Cannot decrease value of 1"})
        }
        lamina.cantidad -= 1
        lamina = await lamina.save()

        const laminaRefInfo = await lamina.findLaminaRefInfo()
        
        return res.json({
            laminaRefInfo,
            lamina
        })

    }catch(e){
        return res.status(404).json({
            error: "Lamina not found"
        })
    }
}


exports.validateNewLamina = (req, res, next) => {
    reqNumero = req.body.numero
    reqOwner = req.body.ownerId
    Lamina.findOne({ numero: reqNumero, ownerId: reqOwner }, (err, userLamina) => {
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
