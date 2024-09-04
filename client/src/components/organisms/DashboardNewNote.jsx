import { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DashboardNewNote = () => {

    // Initialize state for loading status
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Initialize state for form data
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        text: '',
    });

    // Get the currentUser from the Redux store
    const { currentUser } = useSelector((state) => state.user);

    // Function to handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure the user is logged in
        if (!currentUser) {
            toast.error('Please login to add a new note'); // Display error message
            return;
        }

        const token = currentUser.stsTokenManager.accessToken; // Extract the token

        // Prepare data to be stored
        const noteData = {
            category: formData.category,
            title: formData.title,
            text: formData.text,
            user: currentUser.email, // Get email from Redux store
            date: new Date().toISOString(), // Add the current date in ISO format
        };

        // Check if any field is empty and display an error message
        if (!noteData.category || !noteData.title || !noteData.text) {
            toast.error('Please fill in all fields');
            return;
        }

        // Set loading to true to display a loading message to the user
        setLoading(true);
        try {
            // Make a POST request to the API route to create a new note
            const response = await fetch('/api/notes', {
                method: 'POST',
                // Include the token in the request headers to authenticate the user 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(noteData),
            });

            if (!response.ok) {
                throw new Error('Failed to create note');
            }

            // Parse the response as JSON
            const data = await response.json();
            toast.success('Note added successfully'); // Display success message
            setLoading(false); // Set loading to false after successful submission
            navigate('/dashboard?tab=notes'); // Redirect to dashboard

            // Clear form after submission
            setFormData({
                category: '',
                title: '',
                text: '',
            });
        } catch (error) {
            toast.error('Error adding note: ' + error.message); // Display error message
            setLoading(false); // Ensure loading is stopped in case of error
        }
    };

    return (
        <div className="flex justify-center items-center md:min-h-[90vh] px-4 py-6 bg-gray-100">
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
