import express from "express"

import validate from "../validators/validate.midlleware.js"
import { registerSchema } from "../validators/auth.validator.js"

import  {loginSchema} from "../validators/auth.validator.js"
import { register,login, refresh, logout}from "../controllers/auth.controller.js";


const router= express.Router();

// Registration
router.post(
    "/register",
    validate(registerSchema),
    register
);

// Login
router.post(
    "/login",
    validate(loginSchema),
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

export default router;
