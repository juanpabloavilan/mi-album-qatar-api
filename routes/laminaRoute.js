const express = require('express')
const router = express.Router()
const Lamina = require('../models/Lamina')
const {getAllLaminas, getLamina, addLamina, validateRef, deleteLamina} = require('../controllers/laminaController')

router.get('/', getAllLaminas)

router.get('/:id', getLamina)

router.post('/', validateRef, addLamina)

// router.patch('/:id', async (req,res) => {})

router.delete('/:id', deleteLamina)

module.exports = router