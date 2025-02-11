import './App.css';
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import LoginPage from './components/login.js';
import { ToastContainer } from "react-toastify";
import  AdminDashboard  from "./components/admindashboard.js";
import EventList from './components/EventList.js';
import CreateEvent from './components/createEvent.js';
import UpdateEvent from './components/EditEvent.js';
import UserList from './components/Userlist.js';

function PrivateRoute({ children }) {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/listevents" element={<PrivateRoute><EventList /></PrivateRoute>} />
        <Route path="/createEvent" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
        <Route path="/updateEvent/:title" element={<PrivateRoute><UpdateEvent /></PrivateRoute>} />
        <Route path="/userslist" element={<PrivateRoute><UserList /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
