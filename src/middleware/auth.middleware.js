import jwt from "jsonwebtoken"
import AppError from "../utils/AppError.js"


export const authMiddleware= (req,res,next)=>{


    try{
           const token= req.cookies.accessToken;

           if(!token)
           {
            throw new AppError("Authentication required", 401);
           }

           const decoded= jwt.verify(
            token,
            process.env.JWT_SECRET
           );
           req.user= decoded;
           next();
    }
    catch(error)
    {
        next(error);
 }
    
}