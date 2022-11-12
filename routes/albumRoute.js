const express = require('express')
const router = express.Router()
const Lamina = require('../models/Lamina')
const {getAllLaminas, getLamina, addLamina, validateRef, deleteLamina, getUserLaminas, getLaminasOfRef} = require('../controllers/albumController')

router.get('/:user_id', getUserLaminas)

router.get('/:ref_id', getLaminasOfRef)

router.get('/getLamina=:id', getLamina)

router.post('/', validateRef, addLamina)

// router.patch('/:id', async (req,res) => {})

router.delete('/del/:id', deleteLamina)

module.exports = router