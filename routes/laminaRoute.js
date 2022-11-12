const express = require('express')
const router = express.Router()
const {validateRef} = require('../controllers/albumController')
const {getLamina,addLamina,deleteLamina, validateNewLamina, increaseLaminaQty, decreaseLaminaQty} = require('../controllers/laminaController')

router.get('/:id', getLamina)

router.post('/', validateRef, validateNewLamina, addLamina)

router.delete('/del/:id', deleteLamina)

router.patch('/increase=:id',increaseLaminaQty)

router.patch('/decrease=:id',decreaseLaminaQty)

module.exports = router