import { getAuthHeaders } from "./fetchUtils";

// Generic API request function 
const apiRequest = async (url, method = 'GET', body = null, currentUser) => {

    // Prepare the request options with the method and headers
    const options = {
        method,
        headers: getAuthHeaders(currentUser),
    };

    // If the request is not a GET request and the body is not null, add the body to the request
    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        // Make the request to the API
        const response = await fetch(url, options);

        // If the response is not successful, throw an error
        if (!response.ok) {
            // Parse the error response and throw it
            const errorData = await response.json();
            const errorMessage = errorData.message || `Error test: ${response.status}`;
            throw new Error(errorMessage);
        }

        return await response.json(); // Return the data as JSON
        
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

// Export specific functions for each API operation

// Function to create a new note
export const createNote = (noteData, currentUser) => {
    // Make a POST request to the /api/notes endpoint with the note data
    // and the current user's authentication token in the headers
    return apiRequest('/api/notes', 'POST', noteData, currentUser); 
};

// Function to get all notes for a user
export const getNotes = (userEmail, currentUser) => {
    // Make a GET request to the /api/notes endpoint with the user email as a query parameter
    // and the current user's authentication token in the headers
    return apiRequest(`/api/notes?user=${encodeURIComponent(userEmail)}`, 'GET', null, currentUser);
};

// Function to update a note
export const updateNote = (noteId, formValues, currentUser) => {
    // Make a PUT request to the /api/notes/:id endpoint with the note ID and updated note data
    // and the current user's authentication token in the headers 
    return apiRequest(`/api/notes/${noteId}`, 'PUT', formValues, currentUser);
};

// Function to delete a note
export const deleteNote = (noteId, currentUser) => {
    // Make a DELETE request to the /api/notes/:id endpoint with the note ID
    // and the current user's authentication token in the headers
    return apiRequest(`/api/notes/${noteId}`, 'DELETE', null, currentUser);
};