import Note from '../models/note.model.js';
import { errorHandler } from '../utils/error.js'; 

export const createNote = async (req, res, next) => {
    const { category, title, text, user } = req.body;

    if (!category || !title || !text || !user) {
        return next(errorHandler(400, 'All fields are required'));
    }

    const newNote = new Note({
        category,
        title,
        text,
        user,
    });

    try {
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err) {
        next(errorHandler(500, 'Server error'));
    }
}

export const getNotes = async (req, res, next) => {
    const userEmail = req.query.user;
    if (!userEmail) {
        return next(errorHandler(400, 'User email is required'));
    }

    try {
        const notes = await Note.find({ user: userEmail });
        res.status(200).json({ notes });
    } catch (err) {
        next(errorHandler(500, 'Server error'));
    }
};

export const updateNote = async (req, res, next) => {
    const { id } = req.params;
    const { title, text, category } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, text, category },
            { new: true }
        );

        if (!updatedNote) {
            return next(errorHandler(404, 'Note not found'));
        }

        res.status(200).json(updatedNote);
    } catch (err) {
        next(errorHandler(500, 'Server error'));
    }
};

export const deleteNote = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return next(errorHandler(404, 'Note not found'));
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        next(errorHandler(500, 'Server error'));
    }
};
