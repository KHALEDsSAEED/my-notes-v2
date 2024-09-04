// middleware/authMiddleware.js
import admin from './firebaseAdmin.js';

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assumes token is sent as "Bearer <token>"

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Add the decoded token to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};