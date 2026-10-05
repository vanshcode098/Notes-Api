import Note from "../models/note.model.js";

export const createNote= async(data)=>{
    return await Note.create(data);
};

export const findNotesByUserId= async(userId)=>{
    return await Note.find({
        userId:userId
    });
}

export const findNoteById = async (id) => {

    return await Note.findById(id);

};