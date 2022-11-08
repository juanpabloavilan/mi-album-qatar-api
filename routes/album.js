const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const Album = require('../models/Album')

router.get('/', async (req, res)=>{
    try{
        const albumes = await Album.find()
        res.json(albumes)
    } catch (err){
        res.status(500).send({ message: err.message })
    }
    //Express automaticamente envia status code 200 y asigna el content type como plain/text
})

router.post('/', async (req,res) => {
    const newAlbum = new Album({
        laminasMap: req.params.laminasMap
    })
    try{
        const storedAlbum = newAlbum.save()
        res.json(storedAlbum)
    } catch (err){
        res.status(400).send({ message: err.message })
    }
})

router.patch('/:id', (req,res)=>{

})

router.delete('/:id', (req,res)=>{
    
})
module.exports = router