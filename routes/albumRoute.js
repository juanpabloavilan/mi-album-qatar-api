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

router.patch('/:id', getAlbum, (req,res)=>{
    resAlbum = res.storedAlbum
    try{
        isLamina = lamina => lamina instanceof Lamina
        if(!req.laminas.every(isLamina)){
            return res.status(400)
        }
        Album.updateOne({ idPropietario: resAlbum.id },{ laminas: req.laminas})  //solo se puede cambiar la lista de mapas
    }catch(err){
        res.status(404).json({ message: err.message })
    }
    res.json(resAlbum.laminas)
})

router.delete('/:id', (req,res)=>{
    
})

async function getAlbum(req,res,next){
    let storedAlbum
    try{
        storedAlbum = await Album.findById(req.params.id)
        if(storedAlbum == null){
            return res.status(404)
        }
    }catch(err){
        return res.status(500).json({ message: err.message })
    }
    res.album = storedAlbum
    next()
}

module.exports = router