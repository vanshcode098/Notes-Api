


import { createNote , findNotesByUserId,findNoteById} from "../repositories/note.repository.js";
import AppError from "../utils/AppError.js";

export const createNoteService = async (data, userId) => {

    const note = await createNote({
        title: data.title,
        content: data.content,
        userId: userId
    });

    return note;
};



export const getUserNotesService = async (userId) => {

    const notes = await findNotesByUserId(userId);

    return notes;
};




export const getNoteByIdService = async (noteId, userId) => {

    const note = await findNoteById(noteId);

   if(!note)
   {
    throw new AppError("note is unavailable",404);
   }

   
    if (note.userId.toString() !== userId) {
        throw new AppError("Access denied", 403);
    }

    return note;
};