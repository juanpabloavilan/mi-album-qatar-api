const express = require('express')
const router = express.Router()
const {getAlbum ,getUserLaminas, getLaminasOfRef, getAlbumLamina, getLaminasByEquipo} = require('../controllers/albumController')

router.get('/', getAlbum)

router.get('/ref/:ref_id', getAlbumLamina) 

router.get('/:user_id', getUserLaminas)

router.get('/ref_laminas/:ref_id', getLaminasOfRef)

router.get('/equipo/:equipo', getLaminasByEquipo)

module.exports = router