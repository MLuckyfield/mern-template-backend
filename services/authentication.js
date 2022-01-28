const User = require('../models/user/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const ADMIN = 'admin';
const USER = 'user';

const validatePass=(actual,proposed)=>{
  return bcrypt.compare(actual, proposed);
}
const newPass = (password)=>{
  return bcrypt.hash(password, 12);
}
const createToken=(user)=>{
  //sign and issue token
  let token = jwt.sign({
      user_id: user._id,
      role: user.role,
      name: user.name,
      email: user.email
    },
    process.env.SECRET,
    {expiresIn: '7 days'}
  );

  let result = {
    name: user.name,
    email: user.email,
    role: user.role,
    token: token,
    expiresIn: 168
  };

  return result
}

const auth = (req,res,next)=>{
  console.log('auth check')
  let token = req.headers.authorization
  if(token){
      jwt.verify(token,process.env.SECRET, (err, decoded)=>{
        if (err){
          console.log(err)
          return res.status(403).json({
            message: 'There was a problem with authorization',
            success: false
          });
        }else{
          req.user=decoded
          console.log('decoded '+decoded)
          next()
        }
      })
  }
  else{
    return res.status(403).json({
      message: 'There was a problem with authorization',
      success: false
    });
  }
}
const permission = (access)=>{
  return (req,res,next)=>{
    console.log('permission check')
    if(req.user.role == access){
      next()
    }else{
      return res.status(403).json({
        message: 'There was a problem with access',
        success: false
      });
    }
  }
}

module.exports = {
  createToken,
  newPass,
  validatePass,
  auth,
  permission
}
