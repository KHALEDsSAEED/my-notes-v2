import { createNote, getNotes, updateNote, deleteNote } from "../controllers/note.controller";
import Note from "../models/note.model.js"; // Adjust import based on your project structure

jest.mock("../models/note.model.js"); // Mock the Note model

describe('Note Controller Tests', () => {
    it('should create a note successfully', async () => {
        // Mock the save method to resolve successfully
        Note.prototype.save = jest.fn().mockResolvedValue({
            title: 'Test Note',
            text: 'This is a test note',
            category: 'Test',
            user: 'khaled18saaeed@gmail.com'
        });

        const req = {
            body: {
                title: 'Test Note',
                text: 'This is a test note',
                category: 'Test',
                user: 'khaled18saaeed@gmail.com'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await createNote(req, res, next);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            title: 'Test Note',
            text: 'This is a test note',
            category: 'Test',
            user: 'khaled18saaeed@gmail.com'
        });
        expect(next).not.toHaveBeenCalled(); // Ensure next is not called in a successful case
    });

    it('should handle missing fields', async () => {
        const req = {
            body: {
                title: 'Test Note',
                text: 'This is a test note',
                // category and user are missing
            }
        };
        const res = {};
        const next = jest.fn();

        await createNote(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 400,
            message: 'All fields are required'
        }));
    });

    it('should handle errors from the database', async () => {
        // Mock the save method to reject with an error
        Note.prototype.save = jest.fn().mockRejectedValue(new Error('Database error'));

        const req = {
            body: {
                title: 'Test Note',
                text: 'This is a test note',
                category: 'Test',
                user: 'khaled18saaeed@gmail.com'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await createNote(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 500,
            message: 'Server error'
        }));
    });

    it('should get all notes for a specific user successfully', async () => {
        Note.find = jest.fn().mockResolvedValue([
            { title: 'Test Note 1', text: 'Text 1', category: 'Category 1', user: 'khaled18saaeed@gmail.com' },
            { title: 'Test Note 2', text: 'Text 2', category: 'Category 2', user: 'khaled18saaeed@gmail.com' }
        ]);

        const req = {
            query: {
                user: 'khaled18saaeed@gmail.com'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await getNotes(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            notes: [
                { title: 'Test Note 1', text: 'Text 1', category: 'Category 1', user: 'khaled18saaeed@gmail.com' },
                { title: 'Test Note 2', text: 'Text 2', category: 'Category 2', user: 'khaled18saaeed@gmail.com' }
            ]
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should handle missing user email', async () => {
        const req = { query: {} };
        const res = {};
        const next = jest.fn();

        await getNotes(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 400,
            message: 'User email is required'
        }));
    });

    it('should update a note successfully', async () => {
        Note.findByIdAndUpdate = jest.fn().mockResolvedValue({
            _id: 'noteId',
            title: 'Updated Note',
            text: 'Updated text',
            category: 'Updated category'
        });

        const req = {
            params: { id: 'noteId' },
            body: {
                title: 'Updated Note',
                text: 'Updated text',
                category: 'Updated category'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await updateNote(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            _id: 'noteId',
            title: 'Updated Note',
            text: 'Updated text',
            category: 'Updated category'
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should handle note not found for update', async () => {
        Note.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

        const req = {
            params: { id: 'noteId' },
            body: {
                title: 'Updated Note',
                text: 'Updated text',
                category: 'Updated category'
            }
        };
        const res = {};
        const next = jest.fn();

        await updateNote(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 404,
            message: 'Note not found'
        }));
    });

    it('should delete a note successfully', async () => {
        Note.findByIdAndDelete = jest.fn().mockResolvedValue({
            _id: 'noteId',
            title: 'Test Note',
            text: 'Test text',
            category: 'Test category'
        });

        const req = { params: { id: 'noteId' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await deleteNote(req, res, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Note deleted successfully' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should handle note not found for delete', async () => {
        Note.findByIdAndDelete = jest.fn().mockResolvedValue(null);

        const req = { params: { id: 'noteId' } };
        const res = {};
        const next = jest.fn();

        await deleteNote(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.objectContaining({
            statusCode: 404,
            message: 'Note not found'
        }));
    });
});
