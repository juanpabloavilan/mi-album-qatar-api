const Lamina = require('../models/Lamina')
const Referencia = require('../models/LaminaRef')
// ALBUM: REPOSITORIO DE LAMINAS DE REFERENCIA
// PERMITE OBTENER LAMINAS DE ENLACE
exports.getAlbum = (req, res) => {
    Referencia.find((err, laminas) => {
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

exports.getAlbumLamina = (req,res) => {
    let reqId = req.params.id
    Referencia.findOne({ refId: reqId},(err, albumLamina) => {
        return err ?
            res.status(500).json({ message: err.message }) :
            res.status(200).json(albumLamina);
    });
}

exports.getLaminasByEquipo = (req,res) => {
    console.log(req.params)
    let equipo = req.params.equipo
    Referencia.find({equipo: equipo},(err, laminas) => {
        if(err){
            return res.status(500).json(laminas)
        }
        return laminas == null ?
            res.status(404).json({message: 'Invalid team'}) :
            res.status(200).json(laminas)
    })
}

//MIDDLEWARE
exports.validateRef = (req, res, next) => { //Sticker reference validator, creation of new Sticker(POST)
    id = req.body.idRef
    Referencia.findById(id,(err,ref) => {
        if(err){
            res.err = err.message 
        }
        res.ref = ref
        next()
    })
}

