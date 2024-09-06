import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/atoms/Logo';
import Button from '../components/atoms/Button';
import { Label, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, signInFailure, signInStart } from '../redux/user/userSlice';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.user);

    // state variables for form data and form visibility
    const [formData, setFormData] = useState({});
    const [showResetForm, setShowResetForm] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

    // function to handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value.trim()
        });
    };

    // function to handle form submission for sign in
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        if (!email || !password) {
            toast.error('Please fill in all fields.');
            return;
        }

        dispatch(signInStart());

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            dispatch(signInSuccess(userCredential.user));
            toast.success('Sign in successful!');
            navigate('/dashboard?tab=profile');
        } catch (err) {
            dispatch(signInFailure(err.message));
            toast.error('Error during sign in: ' + err.message);
        }
    };

    // function to handle password reset
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!resetEmail) {
            toast.error('Please enter your email address.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, resetEmail);
            toast.success('Password reset email sent! Please check your inbox.');
            setShowResetForm(false);
        } catch (err) {
            toast.error('Error sending reset email: ' + err.message);
        }
    };

    return (
        <div className='min-h-screen mt-20'>
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                <div data-testid='text-container' className="flex-1">
                    <Link data-testid="text-logo" to='/' className='font-bold dark:text-white text-4xl'>
                        <Logo />
                    </Link>
                    <p data-testid='text-content' className='text-sm mt-5'>
                        Welcome, please sign in to continue
                    </p>
                </div>

                <div data-testid='form-container' className="flex-1">
                    {!showResetForm ? (
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
                                    placeholder='*********'
                                    id='password'
                                    onChange={handleChange}
                                />
                            </div>
                            <Button
                                type='submit'
                                content='Sign In'
                                disabled={loading}
                            />
                            <div className="flex flex-col gap-2 text-dm mt-5">
                                <div className="">
                                    <span>Forget Password? </span>
                                    <span onClick={() => setShowResetForm(true)}
                                            className='text-blue-500 cursor-pointer'
                                    >
                                        Reset
                                    </span>
                                </div>
                                <div className="">
                                    <span>Dont have an account? </span>
                                    <Link to='/sign-up' className='text-blue-500'>
                                        Sign Up
                                    </Link>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <form className='flex flex-col gap-4' onSubmit={handleResetPassword}>
                            <div>
                                <Label value='Enter your email address' />
                                <TextInput
                                    type='email'
                                    placeholder='Email'
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value.trim())}
                                />
                            </div>
                            <Button
                                type='submit'
                                content='Send Reset Link'
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowResetForm(false)}
                                className='text-blue-500 mt-4'
                            >
                                Back to Sign In
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signin;
