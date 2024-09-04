import { createSlice } from '@reduxjs/toolkit';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-toastify';

// Define the initial state for the user slice
const initialState = {
    currentUser: null,
    loading: false,
    error: null,
};

// Create a user slice to manage the user state
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {  // Define the signInStart reducer
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => { // Define the signInSuccess reducer
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => { // Define the signInFailure reducer
            state.loading = false;
            state.error = action.payload;
        },
        signUpStart: (state) => { // Define the signUpStart reducer
            state.loading = true;
            state.error = null;
        },
        signUpSuccess: (state, action) => { // Define the signUpSuccess reducer
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signUpFailure: (state, action) => { // Define the signUpFailure reducer
            state.loading = false;
            state.error = action.payload;
        },
        signoutSuccess: (state) => { // Define the signoutSuccess reducer
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        updateProfileSuccess: (state, action) => {
            state.currentUser = {
                ...state.currentUser,
                ...action.payload
            };
            state.loading = false;
            state.error = null;
        }
    }
});

// Export the actions generated from the slice
export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signUpStart,
    signUpSuccess,
    signUpFailure,
    signoutSuccess,
    updateProfileSuccess,
} = userSlice.actions;

// Export the reducer for the slice
export default userSlice.reducer;

// Define an asynchronous action to sign in a user using Firebase
export const signOutUser = () => async (dispatch) => {
    try {
        // Sign out the user using Firebase
        await firebaseSignOut(auth);
        // Dispatch the signoutSuccess action to update the state
        dispatch(signoutSuccess());
        // Display a success message to the user
        toast.success('Signed out successfully');
    } catch (error) {
        // Handle any errors that occur during sign out
        toast.error('Error during sign out: ' + error.message);
    }
};

