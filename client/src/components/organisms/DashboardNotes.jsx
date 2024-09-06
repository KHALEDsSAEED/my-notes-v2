import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../atoms/Button';
import ClipLoader from 'react-spinners/ClipLoader';
import { getNotes, deleteNote, updateNote } from '../../utils/apiService';

// Array of note categories
const categories = ['work', 'personal', 'study'];

const DashboardNotes = () => {
    // Initialize state variables
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');
    const [isEditing, setIsEditing] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [formValues, setFormValues] = useState({ title: '', text: '', category: '' });

    // Get the currentUser from the Redux store
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchNotes = async () => {
            if (!currentUser) {
                setError('No user is logged in');
                setLoading(false);
                return;
            }

            try {
                // Fetch notes from the API using the utility function
                const data = await getNotes(currentUser.email, currentUser);

                // Throw an error if the response format is invalid
                if (!Array.isArray(data.notes)) {
                    throw new Error('Invalid response format');
                }

                // Map the notes array to include the note id and set the notes state variable
                const notesList = data.notes.map(note => ({
                    id: note._id,
                    ...note
                }));

                setNotes(notesList);
                setFilteredNotes(notesList);
            } catch (err) {
                setError('Error fetching notes: ' + err.message);
                toast.error('Error fetching notes: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [currentUser]);

    useEffect(() => {
        // Filter notes based on search query, selected category, and sort order
        const filterNotes = () => {
            let filtered = notes;
            if (searchQuery) {
                const lowercasedQuery = searchQuery.toLowerCase();
                filtered = filtered.filter(note =>
                    note.title.toLowerCase().includes(lowercasedQuery) ||
                    note.text.toLowerCase().includes(lowercasedQuery) ||
                    note.category.toLowerCase().includes(lowercasedQuery)
                );
            }

            if (selectedCategory) {
                filtered = filtered.filter(note => note.category === selectedCategory);
            }

            if (sortOrder === 'newest') {
                filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } else if (sortOrder === 'oldest') {
                filtered = filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            }
            setFilteredNotes(filtered);
        };

        filterNotes();
    }, [searchQuery, selectedCategory, sortOrder, notes]);

    // Delete a note by its id using the API utility function
    const handleDelete = async (noteId) => {
        try {
            await deleteNote(noteId, currentUser);

            // Filter out the deleted note from the state
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
            setFilteredNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));

            toast.success('Note deleted successfully!');
        } catch (err) {
            setError('Error deleting note: ' + err.message);
            toast.error('Error deleting note: ' + err.message);
        }
    };

    // Set the current note and form values for editing
    const handleEdit = (note) => {
        setCurrentNote(note);
        setFormValues({ title: note.title, text: note.text, category: note.category });
        setIsEditing(true);
    };

    // Update the note in the database using the API utility function
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const updatedNote = await updateNote(currentNote.id, formValues, currentUser);

            // Update the notes and filteredNotes state variables
            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note.id === updatedNote._id ? updatedNote : note
                )
            );

            setFilteredNotes(prevNotes =>
                prevNotes.map(note =>
                    note.id === updatedNote._id ? updatedNote : note
                )
            );
            setIsEditing(false);
            toast.success('Note updated successfully!');
        } catch (err) {
            setError('Error updating note: ' + err.message);
            toast.error('Error updating note: ' + err.message);
        }
    };

    // Handle input change for the form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    return (
        <div  data-testid="dashboard-notes" className="p-4 bg-gray-100">
            {loading && <div className="flex justify-center items-center h-64"><ClipLoader color="#000" loading={loading} size={50} /></div>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 border w-full border-gray-300 rounded-md"
                        />
                        <select
                            name="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                        <select
                            name="sort"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>

                    {isEditing ? (
                        <div className="max-w-md mx-auto mt-2 md:mt-10 bg-white p-6 rounded-lg shadow-lg mb-6">
                            <h2 className="text-xl font-bold mb-4">Edit Note</h2>
                            <form onSubmit={handleUpdate}>
                                <select
                                    name="category"
                                    value={formValues.category}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    name="title"
                                    value={formValues.title}
                                    onChange={handleInputChange}
                                    placeholder="Title"
                                    className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                                />
                                <textarea
                                    name="text"
                                    value={formValues.text}
                                    onChange={handleInputChange}
                                    placeholder="Text"
                                    className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                                    rows="4"
                                />

                                <Button
                                    type="submit"
                                    content="Update"
                                />
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-xl font-bold mb-4">My Notes</h1>

                            {filteredNotes.length === 0 ? (
                                <p>No notes available</p>
                            ) : (
                                <ul>
                                    {filteredNotes.map(note => (
                                        <li key={note.id} className="mb-4 p-4 border border-gray-200 rounded-md">
                                            <h2 className="text-lg font-semibold">{note.title}</h2>
                                            <p className="mt-2">{note.text}</p>
                                            <p className="mt-2 text-sm text-gray-500">Category: {note.category}</p>
                                            <p className="mt-2 text-sm text-gray-500">Date: {new Date(note.createdAt).toLocaleString()}</p>
                                            <div className="flex gap-3">
                                                <Button
                                                    onClick={() => handleEdit(note)}
                                                    className="mt-2 bg-blue-500 hover:!bg-blue-500 text-white rounded-md"
                                                    content="Edit"
                                                />
                                                <Button
                                                    onClick={() => handleDelete(note.id)}
                                                    className="mt-2 bg-red-500 hover:!bg-red-600 text-white rounded-md"
                                                    content="Delete"
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )
                            }
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DashboardNotes;
