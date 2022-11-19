const express = require('express')
const router = express.Router()
const {getAlbum ,getUserLaminas, getLaminasOfRef, getAlbumLamina} = require('../controllers/albumController')

router.get('/', getAlbum)

router.get('/ref/:ref_id', getAlbumLamina) 

router.get('/:user_id', getUserLaminas)

router.get('/ref_laminas/:ref_id', getLaminasOfRef)

module.exports = router