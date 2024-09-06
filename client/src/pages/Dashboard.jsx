import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import DashSidebar from "../components/organisms/DashboardSidebar";
import DashboardProfile from "../components/organisms/DashboardProfile";
import DashboardNotes from "../components/organisms/DashboardNotes";
import DashboardNewNote from "../components/organisms/DashboardNewNote";


function Dashboard() {

    // useLocation hook used to access the current location object in the router
    const location = useLocation();

    // useState hook to store the tab value from the URL
    const [tab, setTab] = useState("");

    useEffect(() => {
        // Get the tab value from the URL and set it in the state
        const urlParams = new URLSearchParams(location.search);
        const tabFromURL = urlParams.get("tab");
        if (tabFromURL) {
            setTab(tabFromURL);
        }
    }, [location]);

    return (
        <div className=" flex flex-col md:flex-row h-[90vh] bg-gray-100">
            <div data-testid="dashboard-sidebar" className="md:w-56">
                <DashSidebar />
            </div>
            
            {/* Render the appropriate component based on the tab value */}
            <div className="w-full">
                {tab === "profile" && <DashboardProfile/>}
                {tab === "notes" && <DashboardNotes/>}
                {tab === "new-note" && <DashboardNewNote/>}
            </div>
        </div>
    )
}

export default Dashboard;
