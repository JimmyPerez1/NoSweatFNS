import { NavLink, Link, useNavigate } from 'react-router';
import { Mail, Facebook, Instagram, Twitter } from 'lucide-react';



export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8 px-6 mt-8 w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="mb-4 md:mb-0">
          <Link to="/">
            <img src="/logo.png" alt="No Sweat HVAC Logo" className="h-12 w-auto" />
          </Link>
        </div>


        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <a href="/" className="hover:text-orange-400 transition">Home</a>
            <a href="/services" className="hover:text-orange-400 transition">Services</a>
            <a href="/aboutus" className="hover:text-orange-400 transition">About</a>
            <a href="/FAQ" className="hover:text-orange-400 transition">FAQs</a>
          </div>
          <a
            href="https://popl.co/profile/jimmyperez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:underline text-sm mt-2"
          >
            Click Here to Contact
          </a>
        </div>


        <div className="text-center md:text-right text-sm space-y-2">
          <p>LIC: CAC1823625</p>
          <div className="flex justify-center md:justify-end gap-4 mt-2">
            <a
              href="mailto:nosweatfns@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors duration-200"
              aria-label="Email"
            >
              <Mail />
            </a>
            <a
              href="https://www.facebook.com/people/No-Sweat-FNS/61576818041573"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook />
            </a>
            <a
              href="https://www.instagram.com/nosweatfns/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
            <a
              href="https://x.com/NoSweatFNS"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}