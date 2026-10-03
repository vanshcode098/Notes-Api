import { registerUserService } from "../services/auth.service.js";

export const register= async (req,res,next)=>{

    try{
    const user=  await registerUserService(req.body);
    return res.status(201).json({
         success: true,
         message:"User registered successfully",
         user:{
             id: user._id,
        name: user.name,
        email: user.email
    },
    });
   
}
catch(error)
{
    next(error);
}
};

