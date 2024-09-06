import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/atoms/Logo';
import Button from '../components/atoms/Button';
import { Label, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpStart, signUpSuccess, signUpFailure } from '../redux/user/userSlice'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const Signup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.user);

    // state variable to store the form data 
    const [formData, setFormData] = useState({});

    // function to handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData, // keep all other form data
            [e.target.id]: e.target.value.trim() // update the form data with the new value
        });
    };

    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Destructure the email and password from the form data
        const { email, password } = formData;

        // Check if the email and password are not empty
        if (!email || !password) {
            toast.error('Please fill in all fields.'); // Display error message
            return;
        }

        dispatch(signUpStart()); // Start the sign-up process

        try {
            // Create a new user account using Firebase authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            dispatch(signUpSuccess(userCredential.user)); // Update Redux state on success
            toast.success('Sign up successful!'); // Display success message
            navigate('/dashboard?tab=profile'); // Navigate to home page on success
        } catch (error) {
            dispatch(signUpFailure(error.message)); // Update Redux state on failure
            toast.error('Error during sign up: ' + error.message); // Display error message
        }
    };

    return (
        <div className='min-h-screen mt-20'>
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                <div data-testid="text-container" className="flex-1">
                    <Link data-testid="text-logo" to='/' className='font-bold dark:text-white text-4xl'>
                        <Logo />
                    </Link>
                    <p data-testid="text-content" className='text-sm mt-5'>
                        Welcome, please sign up to continue
                    </p>
                </div>

                <div data-testid="form-container" className="flex-1">
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your Email' />
                            <TextInput
                                type='email'
                                placeholder='Email'
                                id='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Your Password' />
                            <TextInput
                                type='password'
                                placeholder='Password'
                                id='password'
                                onChange={handleChange}
                            />
                        </div>
                        <Button
                            type='submit'
                            content='Sign Up'
                            disabled={loading}
                        />
                    </form>
                    <div data-testid="container" className="flex gap-2 text-sm mt-5">
                        <span>Have an Account?</span>
                        <Link data-testid="link" to='/sign-in' className='text-blue-500'>
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
