import { Sidebar } from 'flowbite-react'
import { useState, useEffect } from 'react'
import { HiArrowSmRight, HiUserCircle } from 'react-icons/hi'
import { FaNoteSticky } from "react-icons/fa6";
import { FaPenFancy } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { signOutUser } from '../../redux/user/userSlice';

const DashboardSidebar = () => {

    const location = useLocation();
    const [tab, setTab] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromURL = urlParams.get("tab");
        if (tabFromURL) {
            setTab(tabFromURL);
        }
    }, [location]);

    const handleSignOut = () => {
        try {
            dispatch(signOutUser());
        }
        catch (err) {
            console.error('Error during sign out:', err);
        }
    };

    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item
                            active={tab == 'profile'}
                            as='div' icon={HiUserCircle}>
                            Profile
                        </Sidebar.Item>
                    </Link >
                    <Link to="/dashboard?tab=notes">
                        <Sidebar.Item
                            active={tab == 'notes'}
                            as='div' icon={FaNoteSticky}>
                            My Notes
                        </Sidebar.Item>
                    </Link >
                    <Link to="/dashboard?tab=new-note">
                        <Sidebar.Item
                            active={tab == 'new-note'}
                            as='div' icon={FaPenFancy}>
                            New Note
                        </Sidebar.Item>
                    </Link >
                    <Sidebar.Item icon={HiArrowSmRight} onClick={handleSignOut} className='cursor-pointer'>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashboardSidebar