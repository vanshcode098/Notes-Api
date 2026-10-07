import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

import validate from "../validators/validate.midlleware.js";

import {
    createNoteSchema,
    updateNoteSchema,
    noteQuerySchema
} from "../validators/note.validator.js";

import {
    createNoteController,
    getUserNotesController,
    getNoteByIdController,
    updateNoteController,
    deleteNoteController
} from "../controllers/note.controller.js";

const router = express.Router();


// CREATE NOTE
router.post(
    "/",
    validate(createNoteSchema, "body"),
    authMiddleware,
    createNoteController
);


// GET ALL MY NOTES
router.get(
    "/",
      validate(noteQuerySchema, "query"),
    authMiddleware,
    getUserNotesController
);


// GET ONE NOTE
router.get(
    "/:id",
    authMiddleware,
    getNoteByIdController
);


// UPDATE NOTE
router.patch(
    "/:id",
    validate(updateNoteSchema, "body"),
    authMiddleware,
    updateNoteController
);


// DELETE NOTE
router.delete(
    "/:id",
    authMiddleware,
    deleteNoteController
);


export default router;

