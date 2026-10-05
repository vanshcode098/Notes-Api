import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import validate from "../validators/validate.midlleware.js";
import { createNoteSchema } from "../validators/note.validator.js";
import { createNoteController,getUserNotesController,getNoteByIdControllerg } from "../controllers/note.controller.js";

const router = express.Router();
// create notes;
router.post("/",validate(createNoteSchema),authMiddleware,createNoteController);


// get all my notes:

router.get("/", authMiddleware,getUserNotesController);
router.get("/:id", authMiddleware,getUserNotesController);
export default router;