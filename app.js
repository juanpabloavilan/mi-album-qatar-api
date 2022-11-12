const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 9090 //Puerto del servidor

//Dependencies and middlewares imports
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

//Importing routes
const usuario = require('./routes/usuario') //Ruta de usuario
const album = require('./routes/albumRoute') //Ruta de lamina
const mesaDeIntercambio = require('./routes/mesaDeIntecambio') //Ruta de mesa de intercambio
const cookieParser = require('cookie-parser')

console.log(process.env.DATABASE)

//Connecting to database.
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
}).then(()=>{
    console.log("DB is connected");
}).catch((e)=>{
    console.log("Unable to connect to database", e);
})

//Declarando Middlewares.
/***Usar JSON parser */
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())




//Definiendo las rutas en la aplicación
app.use('/usuario', usuario)
app.use('/album', album)
app.use('/mesaDeIntercambio', mesaDeIntercambio)

//Event Handler para la ruta /
app.get('/', (req, res)=>{
    res.send('<h1>Bienvenido al Mi album Qatar 2022</h1>')
    //Express automaticamente envia status code 200 y asigna el content type como plain/text
})

app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`);
})