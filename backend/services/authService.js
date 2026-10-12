const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Login for Student and Admin(Both)
const loginUser = async (data) => {
    const{email,password} = data;

    const user = await User.findOne({email});

    //check user exist or not
    if(!user){
        throw new Error("User Not Found");
    }

    //password Match 
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error("Invalid Password");
    }

    //generate token
    const token = jwt.sign(
        {
            id:user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '8h'
        }
    );
    return{
        success:true,
        message:"Login Successfull",
        token,
        user:{
            id:user._id,
            userId:user.userId,
            name:user.name,
            email:user.email,
            role:user.role
        },
    };
};

module.exports = {loginUser};