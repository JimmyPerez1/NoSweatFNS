import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white px-6 py-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Logo + Tagline */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="No Sweat Logo" className="h-10 w-auto" />
          <div>
            <p className="text-sm font-semibold">No Sweat Father & Son</p>
            <p className="text-xs text-gray-400">LIC: CAC1823625</p>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          <Link to="/aboutus" className="hover:underline">About</Link>
          <Link to="/FAQ" className="hover:underline">FAQ</Link>
        </div>

        {/* Right: Contact or Socials */}
        <div className="text-center md:text-right text-sm">
          <a
            href="https://popl.co/profile/jimmyperez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline block"
          >
            Contact Us
          </a>
          <p className="text-gray-400 text-xs mt-1">
            &copy; {new Date().getFullYear()} No Sweat Father & Son
          </p>
        </div>
      </div>
    </footer>
  );
}