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
        <Navbar data-testid="header" className="border-b-2 sticky top-0 h-[10vh] z-30">
            <Link data-testid="logo" to='/' className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
                <Logo />
            </Link>
            <div className='flex gap-2 md:order-2'  data-testid="nav">
                {currentUser ? (
                    <Dropdown className='z-3 border-2 rounded-sm border-[#fecb2e]' arrowIcon={false} inline label={
                        <Avatar
                            alt='user'
                            img={currentUser.photoURL || 'https://avatar.iran.liara.run/public'}
                            rounded
                            className="border-2 border-[#fecb2e] rounded-full"
                        />
                    }>
                        <Dropdown.Header>
                            <span className='block text-lg truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to='/dashboard?tab=profile'>
                            <Dropdown.Item className='text-lg' icon={HiViewGrid}>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item className='text-lg' icon={HiLogout}>
                            <Button onClick={handleSignOut} content='Sign Out' />
                        </Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to='/sign-in'>
                        <Button content='Sign In' />
                    </Link>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse  data-testid="menu" className="z-30 md:bg-transparent bg-white md:border-0 border-2 rounded-sm border-[#fecb2e]">
                <Navbar.Link as={'div'} className="hover:bg-slate-200">
                    <Link
                        to='/'
                        className={`text-lg ${path === '/' ? 'text-[#fecb2e]' : 'text-gray-700'} hover:text-[#fecb2e]`}
                    >
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link as={'div'} className="hover:bg-slate-200">
                    <Link
                        to='/about'
                        className={`text-lg ${path === '/about' ? 'text-[#fecb2e]' : 'text-gray-700'} hover:text-[#fecb2e]`}
                    >
                        About
                    </Link>
                </Navbar.Link>
                {
                    currentUser && (
                        <Navbar.Link as={'div'} className="hover:bg-slate-200">
                            <Link
                                to='/dashboard?tab=notes'
                                className={`text-lg ${path === '/dashboard' ? 'text-[#fecb2e]' : 'text-gray-700'} hover:text-[#fecb2e]`}
                            >
                                Dashboard
                            </Link>
                        </Navbar.Link>
                    )
                }
            </Navbar.Collapse>
        </Navbar >
    );
};

export default Header;
