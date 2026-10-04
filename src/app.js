import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";

const app= express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);

 
app.get("/",(req,res)=>{
  
    res.json({
            message:"Notes API is running"
    });

});

app.use(errorHandler);


export default app;