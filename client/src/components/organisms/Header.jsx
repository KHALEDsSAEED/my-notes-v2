import { Dropdown, Navbar, Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from '../atoms/Logo';
import { HiLogout, HiViewGrid } from "react-icons/hi";
import Button from "../atoms/Button";
import { useSelector, useDispatch } from 'react-redux';
import { signOutUser } from '../../redux/user/userSlice';

const Header = () => {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleSignOut = () => {
        try {
            dispatch(signOutUser());
        }
        catch (err) {
            console.error('Error during sign out:', err);
        }
    };

    return (
        <Navbar className="border-b-2 sticky flex items-center content-center top-0 h-[10vh] z-30">
            <Link to='/' className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
                <Logo />
            </Link>
            <div className='flex gap-2 md:order-2'>
                {/* Display user avatar if available, else display a random avatar */}
                {currentUser ? (
                    <Dropdown className='z-30 border-2 rounded-sm border-[#fecb2e]' arrowIcon={false} inline label={
                        <Avatar 
                        alt='user' 
                        img={currentUser.photoURL || 'https://avatar.iran.liara.run/public'} 
                        rounded  
                        className="border-2 border-[#fecb2e] rounded-full"
                        />
                    }>
                        <Dropdown.Header>
                            <span className='block text-lg truncate'>{currentUser.displayName || currentUser.email.trim().split('@')[0]}</span>
                            <span className='block text-lg truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to='/dashboard?tab=profile'>
                            <Dropdown.Item className='text-lg' icon={HiViewGrid}>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item className='text-lg flex items-center hover:text-[#fecb2e]' icon={HiLogout} onClick={handleSignOut}>
                            <span>Sign Out</span>
                        </Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to='/sign-in'>
                        <Button content='Sign In' />
                    </Link>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse className="z-20 md:bg-transparent bg-white md:border-0 border-2 rounded-sm border-[#fecb2e]">
                <Link
                    to='/'
                    className={`text-lg ${path === '/' ? 'text-[#fecb2e]' : 'text-gray-700'}`}
                >
                    <Navbar.Link as={'div'} 
                    className={`text-lg hover:bg-slate-100 hover:!text-[#fecb2e] ${path === '/' ? 'text-[#fecb2e]' : 'text-gray-700'}`}>
                        Home
                    </Navbar.Link>
                </Link>
                <Link
                    to='/about'
                    className={`text-lg ${path === '/about' ? 'text-[#fecb2e]' : 'text-gray-700'} `}
                >
                    <Navbar.Link as={'div'} className="hover:bg-slate-100 hover:!text-[#fecb2e]">
                        About
                    </Navbar.Link>
                </Link>
                {
                    currentUser && (
                        <Link
                            to='/dashboard?tab=notes'
                            className={`text-lg ${path === '/dashboard' ? 'text-[#fecb2e]' : 'text-gray-700'} `}
                        >
                            <Navbar.Link as={'div'} className="hover:bg-slate-100 hover:!text-[#fecb2e]">
                                Dashboard
                            </Navbar.Link>
                        </Link>
                    )
                }
            </Navbar.Collapse>
        </Navbar >
    );
};

export default Header;
