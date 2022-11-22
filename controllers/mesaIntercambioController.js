const Lamina = require("../models/Lamina");
const Referencia = require("../models/LaminaRef");
const Usuario = require("../models/Usuario");

exports.getLaminasParaRecibir = async (req, res) => {
  //Obtener usuario actual y usuario de consulta  del cuerpo de la peticion
  const currentUserId = req.params.currentUser;
  const otherUserEmail = req.params.otherUser;
  const error = "Something went wrong";
  if (!currentUserId || !otherUserEmail)
    return res.status(400).json({ error: "No body parameters provided" });
  try {
    const otherUser = await Usuario.findOne({ email: otherUserEmail });
    if (!otherUser) {
      error = "Not user found";
      throw Error;
    }

    let otherUserlaminas = await Lamina.find(
      { ownerId: otherUser._id },
      "numero cantidad"
    )
      .where("cantidad")
      .gt(1);

    const laminas = await Promise.all(
      otherUserlaminas.map(async (lamina) => {
        const numero = lamina.numero;
        const hasThisLamina = await Lamina.exists({
          numero,
          ownerId: currentUserId,
        });
        return {
          lamina,
          hasThisLamina: Boolean(hasThisLamina),
        };
      })
    );

    const laminasParaIntercambiar = laminas.filter((lamina) => {
      return !lamina.hasThisLamina;
    });

    res.json(laminasParaIntercambiar);
  } catch (e) {
    res.status(404).json({ error });
  }
};

exports.recibirLamina = async (req, res) => {
  console.log(req.body)
  const numero = req.body.numero; //Numero de lámina que va a recibir.
  const currentUserId = req.body.currentUserId; //Usuario que recibe la lamina
  const otherUserEmail = req.body.otherUserEmail; //Usuario que da la lamina
  
  if(!numero || !currentUserId || !otherUserEmail) return res.status(400).json({error: "No body request parameters provided"})
  if (!res.ref) {
    //Validate Ref Middleware
    return res.status(400).json({ err: "Reference doesnt exist" });
  } else if (res.lamina) {
    //Validate Lamina Middleware
    console.log(res.lamina);
    res.in;
    return res.status(400).json({ err: "You already have this lamina" });
  }

  try{
    const reqLamina = new Lamina({ ownerId: currentUserId, numero, cantidad: 1 });
    const laminaSaved = await reqLamina.save();
    if (!laminaSaved) {
        throw new Error('Could not save lamina');
    }
    let otherUserId = await Usuario.exists({email: otherUserEmail})
    if (!otherUserEmail) {
        throw new Error('Other user does not exist');
    }

    //Disminuyendo las cantidad del otro usuario
     //Find lamina
     
     otherUserId = otherUserId._id.toString()
     let laminaOrigen = await Lamina.findOne({numero, ownerId: otherUserId.toString()})
     if(laminaOrigen.cantidad <= 1) {
         return res.status(400).json({error: "Cannot decrease value of 1"})
     }
     laminaOrigen.cantidad -= 1
     laminaOrigen = await laminaOrigen.save()

     const laminaOrigenRefInfo = await laminaOrigen.findLaminaRefInfo()
     return res.status(201).json({
         laminaOrigenRefInfo,
         laminaOrigen: laminaOrigen,
         laminaSaved
     })


  }catch(e){
    res.status(400).json({error: e.message})
  }
  
};
