import { NavLink, Link, useNavigate } from 'react-router';
import { logOut } from '../../services/authService';

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/');
  }

  const baseLink =
    'text-white hover:text-orange-400 transition px-3 py-2 rounded-md text-sm font-medium';
  const activeLink = 'text-orange-400 font-semibold underline';

  return (
    <nav className="sticky top-0 z-50 bg-blue-900 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link to="/">
          <img src="/logo.png" alt="No Sweat HVAC Logo" className="h-10 w-auto" />
        </Link>


        <div className="flex items-center gap-4">
          <NavLink to="/" className={({ isActive }) => (isActive ? `${baseLink} ${activeLink}` : baseLink)}>Home</NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? `${baseLink} ${activeLink}` : baseLink)}>Services</NavLink>
          <NavLink to="/aboutus" className={({ isActive }) => (isActive ? `${baseLink} ${activeLink}` : baseLink)}>About Us</NavLink>
          <NavLink to="/FAQ" className={({ isActive }) => (isActive ? `${baseLink} ${activeLink}` : baseLink)}>FAQs</NavLink>

          {user ? (
            <>
              <NavLink
                to={`/profile/${user.profile}`}
                className={({ isActive }) => (isActive ? `${baseLink} ${activeLink}` : baseLink)}
              >
                My Profile
              </NavLink>
              <button
                onClick={handleLogOut}
                className="bg-orange-500 hover:bg-blue-900 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Log Out
              </button>
              <span className="text-sm text-white ml-2">Welcome, {user.name}</span>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => (isActive ? `${baseLink} ${activeLink}` : baseLink)}>Log In</NavLink>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? `${baseLink} ${activeLink}` : baseLink)}>Sign Up</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}