const User = require('../models/user/model')
const bcrypt = require('bcrypt')

const userRegister = async (userDets, role, res) =>{
    //validate User
    let notTaken = await(validateUserEmail(userDets.email));
    if (!notTaken){
      return res.status(400).json({
        message:'Email already in use',
        success: false
      });
    }

    //encrypt password
    const password = await bcrypt.hash(userDets.password, 12);

    //create new User
    const newUser = new User({
      ...userDets,
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
        message: 'user creation unsuccessful',
        success: false
      });
    }

};

const doesExist = async(email) => {
  let user = await User.findOne({email});
  return user ? true:false;
};

module.exports = {
  userRegister
}
