const { exists } = require('../models/Lamina');
const Lamina = require('../models/Lamina');
const mailer = require('nodemailer')
const Referencia = require('../models/LaminaRef');
const Usuario = require('../models/Usuario');

const transporter = mailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'juandlh416@gmail.com',
        pass: process.env.EMAIL_PASS,
    },
    secure: true,
});
// ALBUM: REPOSITORIO DE LAMINAS DE REFERENCIA
// PERMITE OBTENER LAMINAS DE ENLACE
exports.getAlbum = (req, res) => {
    Referencia.find((err, laminas) => {
        return err ?
            res.status(500).json({ message: err.message }) :
            res.status(200).json(laminas);
    });
}

exports.getUserLaminas = (req, res) => {
    let reqId = req.params.user_id
    Lamina.find({ ownerId: reqId }, (err, userLaminas) => {
        return err ?
            res.status(500).json({ message: err.message }) :
            res.status(200).json(userLaminas);
    });
}

exports.getLaminasOfRef = (req, res) => {
    let reqId = req.params.ref_id
    Lamina.find({ refId: reqId }, (err, laminasOfRef) => {
        return err ?
            res.status(500).json({ message: err.message }) :
            res.status(200).json(laminasOfRef);
    });
}

exports.getAlbumLamina = (req, res) => {
    let reqId = req.params.id
    Referencia.findOne({ refId: reqId }, (err, albumLamina) => {
        return err ?
            res.status(500).json({ message: err.message }) :
            res.status(200).json(albumLamina);
    });
}
exports.getLaminasByEquipo = async (req, res) => {
    const equipo = req.params.equipo
    const ownerId = req.params.ownerId

    if (!equipo || !ownerId) return res.status(400).json({ error: 'no parameters provided' })

    try {
        const referecias = await Referencia.find({ equipo })
        const laminas = await Promise.all(
            referecias.map(async (laminaRef) => {
                const numero = laminaRef.numero
                const lamina = await Lamina.findOne({ numero, ownerId }, 'cantidad')
                if (!lamina) {
                    return {
                        laminaRef,
                        cantidad: 0
                    }
                }
                return {
                    laminaRef,
                    cantidad: lamina.cantidad
                }
            }
            ))

        res.json(laminas)
    } catch (error) {

    }
}

exports.getLaminasRestantesByEquipo = async (req, res) => {
    const equipo = req.params.equipo
    const id = req.params.ownerId

    if (!equipo || !id) return res.status(400).json({ error: 'no parameters provided' })

    let owner = await Usuario.findById(id);

    try {
        const referecias = await Referencia.find({ equipo })
        const laminas = await Promise.all(
            referecias.map(async (laminaRef) => {
                const numero = laminaRef.numero
                const hasThisLamina = await Lamina.exists({
                    numero,
                    ownerId: id,
                });
                return {
                    laminaRef,
                    hasThisLamina: Boolean(hasThisLamina)
                }
            }
            ))
        const unownedLaminas = laminas.filter(lamina => !lamina.hasThisLamina)
        const numUnowned = laminas.map((lamina) => {
            return lamina.laminaRef.numero
        });
        console.log(numUnowned)
        const mailData = {
            from: 'juandlh416@gmail.com',  // sender address
            to: owner.email,   // list of receivers
            subject: 'Laminas faltantes de ' + equipo,
            text: 'Hola! ' + owner.name,
            html: '<b>Hola!'+owner.name +' </b>' +
                '<br>Las laminas que te faltan de ' + equipo + ' son: <br/>' +
                numUnowned
        };
        transporter.sendMail(mailData, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
        res.json(unownedLaminas)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


/*
exports.getLaminasByEquipo = (req, res) => { //Arreglar
    let equipo = req.params.equipo
    let ownerId = req.params.ownerId
    Referencia.find({ equipo: equipo }, (err, laminas) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        if (laminas == null) {
            res.status(404).json({ message: 'Not found' });
        }
        lamina_promises = laminas.map((refLamina) => {
            let laminaPromise = Lamina.findOne({idRef: refLamina.id, ownerId: ownerId}).exec()
            return user = laminaPromise.then(userLamina => {
                quantity = userLamina == null ? 0 : userLamina.cantidad
                return {
                    refLamina,
                    quantity
                }
            })
        })
        Promise.all(lamina_promises).then(function (result) {
            res.status(200).json(result)
        })
    })
}*/

exports.getLaminaByNumero = (req, res) => {
    let num = req.body.numero
    Referencia.findOne({ numero: num }, (err, albumLamina) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        return albumLamina == null ?
            res.status(404).json({ message: 'Not found' }) :
            res.status(200).json(albumLamina)
    })
}

//MIDDLEWARE
exports.validateRef = (req, res, next) => { //Sticker reference validator, creation of new Sticker(POST)
    const reqNumero = req.body.numero
    Referencia.findOne({ numero: reqNumero }, (err, ref) => {
        if (err) {
            res.err = err.message
        }
        res.ref = ref
        next()
    })
}

