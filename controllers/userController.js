const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')

const register = async (req, res, next) => {
    try{
        const {name, email, password} = req.body;
    const verifyUser = await UserModel.findOne({name});
    if(verifyUser)
      return res.json({msg: "User already registered", status: false});
    const verifyEmail = await UserModel.findOne({email}); 
    if(verifyEmail)
      return res.json({msg: "Email already registered", status: false});
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = await UserModel.create({
        name,
        email,
        password: hashedPassword
    });
    delete User.password;
    return res.json({status: true, User})
    } catch(err){
        console.log(err);
        next();
    }

}

const login = async (req, res, next) => {
  try{
    const {name, password} = req.body;
    console.log(req.body)
    const user = await UserModel.findOne({name});
    console.log(user)
    if(!user)
      return res.json({msg: "User not found", status: false});
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid)
      return res.json({msg: "Password is incorrect", status: false});
    delete user.password;
    
    return res.json({status: true, user});
   

  }catch(err){
    console.log(err)
    next(err)
  }
}

const avatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await UserModel.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage
    });

    return res.json({
      isSet: userData.isAvatarImageSet,
       image: userData.avatarImage
      })
  }catch(err){
    console.log(err)
    next(err)
  }
  
}

const getUsers = async (req, res, next) => {
  try{
    const users = await UserModel.find({_id:{$ne: req.params.id}}).select([
      "email",
       "name", 
       "avatarImage",
       "_id"
    ]);

    return res.json({users})
  }catch(err){
    console.log(err);
    next();
  }
}

module.exports = {
  register,
  login,
  avatar,
  getUsers
};