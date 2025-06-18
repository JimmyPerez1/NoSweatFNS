import { NavLink, Link, useNavigate } from 'react-router';


export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 px-6 mt-8 w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

      {/* Logo */}
      <div className="mb-4 md:mb-0">
        <Link to="/">
          <img src="/logo.png" alt="No Sweat HVAC Logo" className="h-12 w-auto" />
        </Link>
      </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <a href="/" className="hover:text-orange-400 transition">Home</a>
          <a href="/services" className="hover:text-orange-400 transition">Services</a>
          <a href="/aboutus" className="hover:text-orange-400 transition">About</a>
          <a href="/FAQ" className="hover:text-orange-400 transition">FAQs</a>
        </div>

        {/* Legal + Popl Card */}
        <div className="text-center md:text-right text-sm">
          <p>LIC: CAC1823625</p>
          <a
            href="https://popl.co/profile/jimmyperez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:underline"
          >
            Click Here to Contact
          </a>
        </div>
      </div>
    </footer>
  );
}