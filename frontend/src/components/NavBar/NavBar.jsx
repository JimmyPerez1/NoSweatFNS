import { NavLink, Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <Link to="/">
<img src="/logo.png" alt="No Sweat HVAC Logo" className="h-8 w-auto" />        </Link>
      </div>

      <div className="NavBar-right">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/aboutus">About Us</NavLink>
        <NavLink to="/FAQ">FAQs</NavLink>

        {user ? (
          <>
            <NavLink to={`/profile/${user.profile}`}>My Profile</NavLink>
            <button onClick={handleLogOut} className="nav-button">Log Out</button>
            <span className="welcome-msg">Welcome, {user.name}</span>
          </>
        ) : (
          <>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}