import Note from "../models/note.model.js";

export const createNote = async (data) => {
    return await Note.create(data);
};

export const findNoteById = async (id) => {
    return await Note.findById(id);
};

export const updateNoteById = async (id, data) => {
    return await Note.findByIdAndUpdate(
        id,
        data,
        { new: true }
    );
};

export const findNotesByUserId = async (
    userId,
    page,
    limit,
    search
) => {

    const skip = (page - 1) * limit;

    const filter = {
        userId: userId
    };

    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                content: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    const totalNotes = await Note.countDocuments(filter);

    const notes = await Note.find(filter)
        .skip(skip)
        .limit(limit);

    const totalPages = Math.ceil(totalNotes / limit);

    return {
        notes,
        totalNotes,
        totalPages,
        page,
        limit
    };
};

export const deleteNoteById = async (id) => {
    return await Note.findByIdAndDelete(id);
};