export const getAuthHeaders = (currentUser) => {
    return {
        'Content-Type': 'application/json',
         // Add the user's access token as the Authorization header
        'Authorization': `Bearer ${currentUser.stsTokenManager.accessToken}`,
    };
};