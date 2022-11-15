const {validationResult} = require('express-validator')
const User = require("../models/Usuario");
const jwt = require('jsonwebtoken')


exports.signup = (req, res) => {
  // Grabbing the errors that the req may have according to the checks tests
  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({
        error: errors.array()[0].msg //Returning the first error detected
    })
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log("Unable to register user", err);
      return res.status(400).json({
        error: "Unable to register user",
      });
    }
    return res.status(200).json({
      message: "Success",
      user,
    });
  });
};

exports.signin = (req, res) =>{
    console.log(req.body)
    const {email, password} = req.body
    console.log(email, password)
    User.findOne({email},(err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        if(!user.authenticate(password)){
            return res.status(403).json({
                error: "Password doesn't match"
            })
        }
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: '24h'})
        res.cookie('token', token, {expire: new Date()+1})

        const {_id, name, lastname, email, username } = user
        return res.json({
            token,
            user:{
                _id,
                name,
                lastname,
                email,
                username
            }
        })

    } )
}
