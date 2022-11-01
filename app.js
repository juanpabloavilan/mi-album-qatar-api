const express = require('express')
const app = express()
const PORT = 9010 //Puerto del servidor
const usuario = require('./routes/usuario') //Ruta de usuario
const album = require('./routes/album') //Ruta de album
const lamina = require('./routes/lamina') //Ruta de lamina
const mesaDeIntercambio = require('./routes/mesaDeIntecambio') //Ruta de mesa de intercambio

//Declarando Middlewares.
/***Usar JSON parser */
app.use(express.json())



//Definiendo las rutas en la aplicación
app.use('/usuario', usuario)
app.use('/album', album)
app.use('/lamina', lamina)
app.use('/mesaDeIntercambio', mesaDeIntercambio)


//Event Handler para la ruta /
app.get('/', (req, res)=>{
    res.send('<h1>Bienvenido al Mi album Qatar 2022</h1>')
    //Express automaticamente envia status code 200 y asigna el content type como plain/text
})

app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`);
})