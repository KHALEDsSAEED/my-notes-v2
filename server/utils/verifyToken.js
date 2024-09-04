import admin from './firebaseAdmin.js';

// Verify the token sent in the request headers to authenticate the user 
export const verifyToken = async (req, res, next) => {
    // Get the token from the request headers 
    const token = req.headers.authorization?.split(' ')[1]; 

    // If no token is provided, return an error response 
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        // Verify the token using the Firebase Admin SDK 
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Add the decoded token to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};