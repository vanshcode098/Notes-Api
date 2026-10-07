import {z} from "zod";


export const createNoteSchema= z.object(
    {
        title: z.string().min(3).max(100),
        content:z.string().min(1)
    }
);

export const updateNoteSchema= z.object(
    {
        title: z.string().min(3).max(100).optional(),
        content:z.string().min(1).optional()
    }
);
export const noteQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(10),
    search: z.string().optional()
});