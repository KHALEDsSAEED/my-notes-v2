import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, deleteUser, sendPasswordResetEmail  } from 'firebase/auth';
import { toast } from 'react-toastify';
import { TextInput } from 'flowbite-react';
import Button from '../atoms/Button';
import { auth } from '../../firebase/firebase';
import { updateProfileSuccess, clearUser } from '../../redux/user/userSlice';

const DashboardProfile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

    const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
    const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '');

    // Update the user profile with the new display name and photo URL
    const handleUpdateProfile = async () => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: displayName,
                photoURL: photoURL
            });

            dispatch(updateProfileSuccess({ displayName, photoURL }));

            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Error updating profile: ' + error.message);
        }
    };

    // Handle user profile deletion
    const handleDeleteProfile = async () => {
        try {
            // Confirm the deletion
            if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
                await deleteUser(auth.currentUser);

                // Clear user data from Redux store
                dispatch(clearUser());

                toast.success('Profile deleted successfully!');
                // Optionally, redirect the user or handle the post-deletion logic
            }
        } catch (error) {
            toast.error('Error deleting profile: ' + error.message);
        }
    };

    // Send a password reset email to the user
    const handleResetPassword = async () => {
        try {
            if (!currentUser?.email) {
                toast.error('No email address available for password reset.');
                return;
            }
            
            await sendPasswordResetEmail(auth, currentUser.email);

            toast.success('Password reset email sent! Check your inbox.');
        } catch (error) {
            toast.error('Error sending password reset email: ' + error.message);
        }
    };

    return (
        <div className="flex justify-center items-center mt-10 md:mt-0 md:min-h-[90vh] bg-gray-100">
            <div className="max-w-lg w-full text-center shadow-lg p-6 rounded-lg">
                <h1 className="my-2 text-center font-semibold text-3xl">Profile</h1>
                <div className="">
                    <img
                        src={currentUser?.photoURL || 'https://avatar.iran.liara.run/public'}
                        alt="user"
                        className="w-20 h-20 rounded-full mx-auto my-2 border-2 border-[#fecb2e]"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <TextInput
                        type="text"
                        label="Email"
                        value={currentUser?.email}
                        disabled
                    />
                    <TextInput
                        type="text"
                        label="Name"
                        value={displayName || currentUser.email.trim().split('@')[0]}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Enter your name"
                    />
                    <TextInput
                        type="text"
                        label="Photo URL"
                        value={photoURL || 'https://avatar.iran.liara.run/public'}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="Enter photo URL"
                    />

                    <Button onClick={handleUpdateProfile} content='Update Profile' />
                    <Button onClick={handleDeleteProfile} content='Delete Profile' className="bg-red-500 hover:!bg-red-600 w-full "/>
                    <Button onClick={handleResetPassword} content='Reset Password' className="bg-blue-500 hover:!bg-blue-600 w-full"/>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfile;
