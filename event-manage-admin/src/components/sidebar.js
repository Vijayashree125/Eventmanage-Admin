import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Remove the token
        localStorage.removeItem("userId")
        toast.success("Logged out successfully!"); // Show a logout message
        navigate("/"); // Redirect to the Sign-in page
    };
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/userslist">Users Management</Link></li>
                <li><Link to="/listevents">Events Management</Link></li>
                <li><Link to="/createEvent">Event Creation</Link></li>
                <li style={{ cursor: 'pointer' }} onClick={handleLogout}>Logout</li>
            </ul>
        </div>
    );
}

export default Sidebar;
