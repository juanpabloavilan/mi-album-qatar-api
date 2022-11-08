const express = require('express')
const router = express.Router()
const Lamina = require('../models/lamina')

router.get('/', async (req, res)=>{
    //Express automaticamente envia status code 200 y asigna el content type como plain/text
    try {
        const laminas = await Lamina.find()
        res.json(laminas)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getLamina, async (req,res) => {
    res.json(res.lamina)
})

router.post('/', async (req,res)=>{
    const reqLamina = new Lamina({
        adquirida: req.body.adquirida,
        idRef: req.body.idRef
    })
    try{
        const newLamina = await reqLamina.save()
        res.status(201).json(newLamina)
    } catch(err) {
        res.status(400).json({ message: err.message }) //400 status: user input error
    }
})

router.patch('/:id', async (req,res) => {

})

async function getLamina(req, res, next) {
    let lamina
    try {
        lamina = await Lamina.findById(req.params.id)
        if (lamina == null){
            return res.status(404) //status 404: not found
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }
    res.lamina = lamina
    next()
}

module.exports = router