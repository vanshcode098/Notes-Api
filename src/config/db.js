import mongoose from "mongoose"

export const connectDB= async ()=>{

    try{
           await mongoose.connect(process.env.MONGO_URL);
           console.log("MongoDB Connceted");
    }
    catch(error)
    {
        console.log("MongoDB Conncetion Failed");
        console.error(error);
        process.exit(1);
    }

};