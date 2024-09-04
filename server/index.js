import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerDocs from '../swagger.js';
import path from 'path';

// Import the routes
import notesRoute from './routes/note.route.js';

import { verifyToken } from './utils/verifyToken.js';



// Load the environment variables
dotenv.config();

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.log('Error connecting to the database ' + error);
    });

const __dirname = path.resolve();

// Create an express app
const app = express();

// Add middleware to parse JSON
app.use(express.json());

app.listen(3000, () => {
    console.log('our Server is running on http://localhost:3000');
});

swaggerDocs(app);

app.use('/api/notes', verifyToken, notesRoute);

app.use(express.static(path.join(__dirname, 'client/dist')));

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