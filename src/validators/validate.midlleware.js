import zod from "zod"


const validate=  (schema)=>{

    return (req,res,next)=>{
     
        const result= schema.safeParse(req.body)
       if(!result) 
        {
                 return next(result.error);
        }
        req.body= result.data;
        next();
    }

};

export default validate;

