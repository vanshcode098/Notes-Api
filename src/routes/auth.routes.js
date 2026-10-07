import express from "express"

import validate from "../validators/validate.midlleware.js"
import { registerSchema } from "../validators/auth.validator.js"

import  {loginSchema} from "../validators/auth.validator.js"
import { register,login, refresh, logout}from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router= express.Router();

// Registration
router.post(
    "/register",
    validate(registerSchema,"body"),
    register
);

// Login
router.post(
    "/login",
    validate(loginSchema,"body"),
    login
);

// REFRESH
router.post(
    "/refresh",
    refresh
);

//LOGOUT:
router.post(
    "/logout",
    logout
);


// AUTHMiddleware

router.get("/me", authMiddleware,(req,res)=>{
    return res.status(200).json({
        success:true,
          message: "Authenticated",
        user: req.user
    });
})

export default router;
