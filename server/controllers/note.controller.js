import Note from '../models/note.model.js';

export const createNote = async (req, res) => {
    const { category, title, text, user } = req.body;

    if (!category || !title || !text || !user) {
        return res.status(400).json({ error: 'All fields are required' });
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
        res.status(500).json({ error: 'Server error' });
    }
}

export const getNotes = async (req, res) => {
    const userEmail = req.query.user;
    if (!userEmail) {
        return res.status(400).json({ error: 'User email is required' });
    }

    try {
        const notes = await Note.find({ user: userEmail });
        res.status(200).json({ notes });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateNote = async (req, res) => {
    const { id } = req.params; 


    const { title, text, category } = req.body; 

    try {
        // Find and update the note
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, text, category },
            { new: true } // Return the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};



export const deleteNote = async (req, res) => {
    const { id } = req.params; 

    try {

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
