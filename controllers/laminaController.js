const Lamina = require('../models/Lamina')
const Referecia = require('../models/LaminaRef')
//
//
//
// &---- SERVICE FUNCTIONS ----&
exports.getAllLaminas = (req, res) => {
    try {
        getAllSchemaLaminas.then((laminas) => {
            res.status(200).json(laminas)
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.getLamina = (req, res) => {
    let lamina
    try {
        getLamina(req.params.id).then((lamina) => {
            res.json(lamina)
        })
        if (lamina == null) {
            return res.status(404) //status 404: not found
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.json(lamina)
}

exports.addLamina = (req, res) => {
    const reqLamina = new Lamina({
        adquirida: req.body.adquirida,
        idRef: req.body.idRef
    })
    try {
        saveSchemaLamina(reqLamina).then((savedLamina) => {
            res.status(201).json(savedLamina)
        })
    } catch (err) {
        res.status(400).json({ message: err.message }) //400 status: user input error
    }
}

exports.deleteLamina = (req, res) => {
    if (getLamina != null) {
        deleteSchemaLamina(req.id).then((deletedId) => {
            if(typeof deletedId === 'String'){
                res.json(req.id + 'has been deleted successfully')
            }
        })
    }
    return res.status(404)
}
//
//
//
// 
//  &---- MIDDLEWARES ----&
exports.validateRef = (req, res, next) => { //Sticker reference validator, creation of new Sticker(POST)
    let reference
    try {
        let reference
        findRefById(req.params.id).then((matchRef) => {
            reference = matchRef
        })
        if (reference == null) {
            return res.status(404) //status 404: not found
        }
    } catch (err) {
        return res.status(500).json({ message: err.errMessage + '/ NO SE ENCONTRO LA REFERENCIA DE LA LAMINA' })
    }
    res.validRef = true
    next()
}
//
//
//
//
// &---- Lamina Schema Methods ----&
getAllSchemaLaminas = new Promise((resolve) => {
    const laminas = Lamina.find()
    resolve(laminas)
})

getLamina(id) {
    return new Promise((resolve) => {
        const lamina = Lamina.findById(id)
        resolve(lamina)
    })
}

function saveSchemaLamina(newLamina) {
    return new Promise((resolve) => {
        resolve(newLamina.save())
    })
}

function deleteSchemaLamina(id) {
    return new Promise((resolve) => {
        Lamina.deleteOne({ id: res.id })
        resolve(id)
    })
}

// &---- Referencia Schema Methods ----&
async function findRefById(id) {
    return new Promise((resolve) => {
        resolve(Referecia.findById(id))
    })
}

