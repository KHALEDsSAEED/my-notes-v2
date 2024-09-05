import Note from '../models/note.model.js';
import { errorHandler } from '../utils/error.js';

// Create a new note in the database
export const createNote = async (req, res, next) => {

    const { category, title, text, user } = req.body;

    // Check if any of the required fields are missing
    if (!category || !title || !text || !user) {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        // Check if a note with the same title already exists for the user
        const existingNote = await Note.findOne({ title, user });

        // If a note with the same title exists, return an error
        if (existingNote) {
            return next(errorHandler(400, 'A note with this title already exists'));
        }

        // Create a new note if the title is unique
        const newNote = new Note({
            category,
            title,
            text,
            user,
        });

        // Save the new note to the database
        const savedNote = await newNote.save();
        res.status(201).json(savedNote); // Return the saved note as a response
    } catch (err) {
        next(errorHandler(500, 'Server error')); // Return a server error response
    }
};

// Get all notes from the database for a specific user
export const getNotes = async (req, res, next) => {
    // Get the user email from the query parameters
    const userEmail = req.query.user;

    // Check if the user email is provided
    if (!userEmail) {
        return next(errorHandler(400, 'User email is required'));
    }

    try {
        // Find all notes with the provided user email
        const notes = await Note.find({ user: userEmail });
        res.status(200).json({ notes }); // Return the notes as a response
    } catch (err) {
        next(errorHandler(500, 'Server error')); // Return a server error response
    }
};

// update a note in the database by its id
export const updateNote = async (req, res, next) => {
    // Get the note id from the request parameters
    const { id } = req.params;

    // Get the title, text, and category from the request body
    const { title, text, category } = req.body;

    try {
        // Find the note by its id and update the title, text, and category
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, text, category },
            { new: true }
        );

        // Return an error response if the note is not found
        if (!updatedNote) {
            return next(errorHandler(404, 'Note not found'));
        }

        // Return the updated note as a response
        res.status(200).json(updatedNote);
    } catch (err) {
        next(errorHandler(500, 'Server error'));
    }
};

// Delete a note from the database by its id
export const deleteNote = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Find the note by its id and delete it
        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return next(errorHandler(404, 'Note not found'));
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        next(errorHandler(500, 'Server error'));
    }
};
