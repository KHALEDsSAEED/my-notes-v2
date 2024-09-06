import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createNote } from '../../utils/apiService';

const DashboardNewNote = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ category: '', title: '', text: '' });
    const { currentUser } = useSelector((state) => state.user);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            return toast.error('Please login to add a new note');
        }

        const { category, title, text } = formData;
        if (!category || !title || !text) {
            return toast.error('Please fill in all fields');
        }

        setLoading(true);
        const noteData = {
            ...formData,
            user: currentUser.email,
            date: new Date().toISOString(),
        };

        try {
            await createNote(noteData, currentUser);  // Use createNote to make the API request
            toast.success('Note added successfully');
            setFormData({ category: '', title: '', text: '' });
            navigate('/dashboard?tab=notes');
        } catch (error) {
            toast.error(`Error adding note: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div data-testid="dashboard-new-note" className="flex justify-center items-center md:min-h-[90vh] px-4 py-6 bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                    <select
                        required
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">--Select Category--</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="study">Study</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700">Text:</label>
                    <textarea
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    content={loading ? 'Adding Note...' : 'Add Note'}
                    className="bg-[#fecb2e] hover:!bg-[#fecb2e] w-full"
                />
            </form>
        </div>
    );
}

export default DashboardNewNote;
