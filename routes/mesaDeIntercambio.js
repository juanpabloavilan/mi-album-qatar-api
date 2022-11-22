const express = require('express')
const { getLaminasParaRecibir, recibirLamina } = require('../controllers/mesaIntercambioController')
const { validateNewLamina} = require('../controllers/laminaController')
const {validateRef} = require('../controllers/albumController')
const router = express.Router()
//'/mesaDeIntercambio'
router.get('/', (req, res)=>{
    res.send('<h1>Bienvenido al endpoint de mesa de intercambio</h1>')
    //Express automaticamente envia status code 200 y asigna el content type como plain/text
})

router.get('/intercambio/:currentUser/:otherUser', getLaminasParaRecibir )

router.post('/intercambio/', validateRef, validateNewLamina, recibirLamina)
module.exports = router