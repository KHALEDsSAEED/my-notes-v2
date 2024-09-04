import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

export default function PrivateRoutes() {
    // Get the currentUser from the Redux store
    const { currentUser } = useSelector(state => state.user)
    // If currentUser is present, render the Outlet component which will render 
    // the child routes of the parent route 
    // If currentUser is not present, redirect the user to the sign-in page
    return currentUser ? <Outlet /> : <Navigate to="/sign-in" />
}
