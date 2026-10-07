


// const validate=  (schema, source)=>{

//     return (req,res,next)=>{
     
//         const result= schema.safeParse(req[source])
//        if(!result.success) 
//         {
//                  return next(result.error);
//         }
//       req[source]  = result.data;
//         next();
//     }

// };

// export default validate;


const validate = (schema, source) => {

    return (req, res, next) => {

        console.log("===== VALIDATION START =====");
        console.log("SOURCE:", source);
        console.log("VALUE:", req[source]);
        console.log("SCHEMA:", schema);

        const result = schema.safeParse(req[source]);

        console.log("RESULT:", result);

        if (!result.success) {
            console.log("ZOD ERROR:", result.error);
            return next(result.error);
        }

        req[source] = result.data;

        console.log("PARSED:", req[source]);

        next();
    };
};

export default validate;
