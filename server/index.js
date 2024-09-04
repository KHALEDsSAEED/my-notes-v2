import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerDocs from '../swagger.js';
import path from 'path';

// Import the routes
import notesRoute from './routes/note.route.js';

// Import the verifyToken function
import { verifyToken } from './utils/verifyToken.js';

// Load the environment variables
dotenv.config();

// Connect to the database using mongoose
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.log('Error connecting to the database ' + error);
    });

// Define the __dirname to use the static files in the client folder
const __dirname = path.resolve();

// Create an express app
const app = express();

// Add middleware to parse JSON
app.use(express.json());

// Start the server on port 3000
app.listen(3000, () => {
    console.log('our Server is running on port 3000');
});

// Create the swagger documentation
swaggerDocs(app);

// Use the notes route for /api/notes requests and verify the token for authentication
app.use('/api/notes', verifyToken, notesRoute);

// Serve the static files in the client/dist folder for production build
app.use(express.static(path.join(__dirname, 'client/dist')));

// Serve the index.html file for all other routes in production build
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        sucess: false,
        statusCode,
        message,
    });
});