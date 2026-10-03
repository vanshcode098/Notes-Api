import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import AppError from "../utils/AppError.js";


export const registerUserService= async(data)=>{


    const existingUser= await User.findOne({
        email: data.email
    });
    if( existingUser)
    {
      throw new AppError("Email already exists", 409);
    }
    const hashPassword= await bcrypt.hash(data.password,10);


    const  user= await User.create({
         name: data.name,
         email: data.email,
         password: hashPassword
    });
    return user;
};