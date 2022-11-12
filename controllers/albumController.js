const { default: mongoose, mongo } = require('mongoose');
const Lamina = require('../models/Lamina')
const Referecia = require('../models/LaminaRef')
//
//
//
// &---- ALBUM SHOWDOWN FUNCTIONS ----&
exports.getAllLaminas = (req, res) => {
    Lamina.find((err, laminas) => {
        return err ?
            res.status(500).json({ message: err.message }) :
            res.status(200).json(laminas);
    });
}

exports.getUserLaminas = (req,res) => {
    let reqId = req.params.user_id
    Lamina.find({ ownerId: reqId},(err, userLaminas) => {
        return err ?
            res.status(500).json({ message: err.message }) :
            res.status(200).json(userLaminas);
    });
}

exports.getLaminasOfRef = (req,res) => {
    let reqId = req.params.ref_id
    Lamina.find({ refId: reqId},(err, laminasOfRef) => {
        return err ?
            res.status(500).json({ message: err.message }) :
            res.status(200).json(laminasOfRef);
    });
}

//&& -- SPECIFIC LAMINA MANAGEMENT FUNCTIONS --&&
exports.getLamina = (req, res) => {
    id = req.params.id
    if (!assertObjectId(id)) { // unvalid ObjectId, bad query.
        res.status(400).json({ message: "Invalid id request" })
        return
    }
    // valid ObjectId, proceed with `findById` call
    Lamina.findById(id, (err, lamina) => {
        err ?
            res.status(500).json({ message: err.message }) :
            res.json(lamina);
    });
}

exports.addLamina = (req, res) => {
    if(!res.ref){
        return res.status(400).json({ err: "Unvalid lamina reference"})
    }
    const reqLamina = new Lamina(req.body);
    reqLamina.save((err, lamina) => {
        if(err){
            res.status(400).json({ err: err.message })
            return
        }
        res.status(201).json(lamina)
    });
}

exports.deleteLamina = (req, res) => {
    id = req.params.id
    if(!assertObjectId(id)){
        res.status(400).json({err: "Invalid id"})
        return
    }
    Lamina.findByIdAndDelete(id,(err,success) => {
        if(err){
            res.status(500).json({err: err.message})
        }
        success == null ? res.status(404).json({error: 'invalid id'}) :
        res.json({msg: id +' deleted'})
    })
}


//  &---- MIDDLEWARES ----&
exports.validateRef = (req, res, next) => { //Sticker reference validator, creation of new Sticker(POST)
    id = req.body.idRef
    Referecia.findById(id,(err,ref) => {
        if(err){
            res.err = err.message 
        }
        res.ref = ref
        next()
    })
}

//Assertions
function assertObjectId(id) {
    return id.match(/^[0-9a-fA-F]{24}$/) != null
}

