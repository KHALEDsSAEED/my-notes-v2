// Used to handle errors in the application by returning an error object with the specified status code and message.
export const errorHandler = (statusCode, message) => {
    const error = new Error(); // Create a new error object
    error.statusCode = statusCode; // Set the status code
    error.message = message; // Set the message
    return error; // Return the error object
};