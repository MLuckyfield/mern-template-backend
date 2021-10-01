const User = require('../models/user/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//LOGIN
const login = async (req, role, res) =>{
    let {email, password} = req;
    //check if exists
    const user = await User.findOne({email});
    if(!user){
      return res.status(201).json({
        message: 'Email not found',
        success: false
      });
    }

    //check password
    let isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
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
        token: `Bearer ${token}`,
        expiresIn: 168
      };

      return res.status(200).json({
        message: 'Welcome back',
        success: true
      });

    }else{
      return res.status(403).json({
        message: 'Password incorrect',
        success: false
      });
    }
};

//REGISTER
const register = async (req, role, res) =>{
    //check if exists
    let taken = await(doesExist(req.email));
    if (taken){
      return res.status(400).json({
        message:'Email already in use',
        success: false
      });
    }

    //encrypt password
    const password = await bcrypt.hash(req.password, 12);

    //create new User
    const newUser = new User({
      ...req,
      password,
      role
    });
    try{
      await newUser.save();
      return res.status(201).json({
        message: 'User created',
        success: true
      });
    }catch(err){
      return res.status(500).json({
        message: `user creation unsuccessful: ${err}`,
        success: false
      });
    }

};

const doesExist = async(email) => {
  let user = await User.findOne({email});
  return user ? true:false;
};

module.exports = {
  register,
  login
}
