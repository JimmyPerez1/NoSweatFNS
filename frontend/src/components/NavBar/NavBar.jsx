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
    <nav className="NavBar">
 <div className="NavBar-left">
        <Link to="/" className="logo">NoSweat</Link>
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