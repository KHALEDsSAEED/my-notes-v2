import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - title
 *         - text
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the note
 *         title:
 *           type: string
 *           description: The title of your note
 *         text:
 *           type: string
 *           description: The content of your note
 *         category:
 *           type: string
 *           description: The category of the note
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the note was created
 *       example:
 *         id: d5fE_asz
 *         title: My first note
 *         text: This is the content of the note
 *         category: work
 *         createdAt: 2024-09-04T12:00:00Z
 */
// Define the note schema 
const noteSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

// Create a model from the schema and export it
const Note = mongoose.model('Note', noteSchema);

export default Note;
