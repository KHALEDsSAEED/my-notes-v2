import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { TextInput } from 'flowbite-react';
import Button from '../atoms/Button';
import { auth } from '../../firebase/firebase';
import { updateProfileSuccess } from '../../redux/user/userSlice';

const DashboardProfile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

    const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
    const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '');

    const handleUpdateProfile = async () => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: displayName,
                photoURL: photoURL
            });

            // Dispatch the update to the Redux store
            dispatch(updateProfileSuccess({ displayName, photoURL }));

            console.log(displayName, photoURL);

            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Error updating profile: ' + error.message);
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

                    <Button onClick={handleUpdateProfile} content='Update Profile'/>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfile;
