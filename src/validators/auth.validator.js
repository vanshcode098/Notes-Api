
import { z } from "zod";

// Validation Schema

const registerSchema = z.object({
    name: z.string().min(3),

    email: z.string().email(),

    password: z.string().min(8)
});




// Login Schema


const loginSchema= z.object({
    email: z.string().email(),
    password:z.string().min(8)
});

export{
    registerSchema,
    loginSchema
}

