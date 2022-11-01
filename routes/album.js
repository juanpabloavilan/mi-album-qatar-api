const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('<h1>Bienvenido al endpoint de album</h1>')
    //Express automaticamente envia status code 200 y asigna el content type como plain/text
})

module.exports = router