const express = require('express')
const { signup, signin } = require('../controllers/userController')
const router = express.Router()
const {check} = require('express-validator')



router.get('/', (req, res)=>{
    res.send('<h1>Bienvenido al endpoint de usuario</h1>')
    //Express automaticamente envia status code 200 y asigna el content type como plain/text
})

//Iniciar sesión
router.post('/signin',[
    check("email", "email should be valid").isEmail(),
    check("password", "username should have at least 4 characters").isLength({min:4}) 
] ,signin)

//Registrar cuenta
// We use check middleware to check the params in the body of the req match the requirements, if not it will report the errors in the req and will send it to the handler function
router.post('/signup',[
    check("name", "name should have at least 2 characters").isLength({min:2}),
    check("lastname", "lastname should have at least 2 characters").isLength({min:2}),
    check("email", "email should be valid").isEmail(),
    check("username", "username should have at least 4 characters").isLength({min:4}),
    check("password", "username should have at least 4 characters").isLength({min:4})
], signup)



//Editar perfil


module.exports = router