
import { success } from "zod";
import { createNoteService ,getUserNotesService,getNoteByIdService,updateNoteService,deleteNoteService} from "../services/note.service.js";

export const createNoteController = async (req, res, next) => {

    try {

        const note = await createNoteService(
            req.body,
            req.user.id
        );

        return res.status(201).json({
            success: true,
            message: "Note created successfully",
            note
        });

    } catch (error) {
        next(error);
    }

};


export const getUserNotesController = async (req, res, next) => {
   
    try{
   
    const notes= await getUserNotesService(
        req.user.id
    );

    return res.status(200).json({
        success:true,
        message: "Notes fetched successfully",
            notes

    });
}
        catch(error)
        {
            next(error);
        }
};

export const getNoteByIdController = async (req, res, next) => {

    try {

        const note = await getNoteByIdService(
            req.params.id,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message: "Note fetched successfully",
            note
        });

    } catch (error) {
        next(error);
    }
};




export const updateNoteController = async (req, res, next) => {

    try{
         const note= await updateNoteService(
            req.params.id,
            req.body,
            req.user.id
         );
         
        return res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note
        });
    }
    catch(error)
    {
        next(error);
    }
};



export const deleteNoteController = async (req, res, next) => {

    try{
         const note= await deleteNoteService(
            req.params.id,
            req.user.id
         );
         
        return res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            note
        });
    }
    catch(error)
    {
        next(error);
    }
};