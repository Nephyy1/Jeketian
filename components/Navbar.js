import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiHome, FiUsers, FiCalendar, FiInfo, FiRadio, FiFileText } from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinkClasses = "text-slate-700 hover:text-pink-600 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium";
  const mobileNavLinkClasses = "flex items-center text-slate-700 hover:text-pink-600 transition-colors duration-300 px-3 py-3 rounded-md text-base font-medium hover:bg-slate-100";

  return (
    <nav className={`fixed w-full z-50 bg-white ${isOpen ? '' : 'shadow-lg'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center text-2xl transition-transform duration-200 hover:scale-105">
              <LuSparkles className="mr-2 h-6 w-6 text-pink-500 transition-colors duration-300 group-hover:text-pink-400" />
              <span className="font-brand text-slate-800 group-hover:text-slate-700 transition-colors duration-300">
                Jeketian
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className={navLinkClasses}>Home</Link>
              <Link href="/members" className={navLinkClasses}>Members</Link>
              <Link href="/schedule" className={navLinkClasses}>Schedule</Link>
              <Link href="/news" className={navLinkClasses}>News</Link>
              <Link href="/live" className={navLinkClasses}>Live</Link>
              <Link href="/information" className={navLinkClasses}>Information</Link>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-slate-700 hover:text-pink-600 focus:outline-none p-2"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white ${isOpen ? 'max-h-screen animate-menu-open shadow-burger-open' : 'max-h-0 animate-menu-close'}`}
        id="mobile-menu"
      >
        <div className={`px-2 pt-2 pb-3 sm:px-3 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <Link href="/" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
            <FiHome className="mr-3 h-5 w-5" />
            Home
          </Link>
          <Link href="/members" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
            <FiUsers className="mr-3 h-5 w-5" />
            Members
          </Link>
          <Link href="/schedule" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
            <FiCalendar className="mr-3 h-5 w-5" />
            Schedule
          </Link>
          <Link href="/news" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
            <FiFileText className="mr-3 h-5 w-5" />
            News
          </Link>
          <Link href="/live" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
            <FiRadio className="mr-3 h-5 w-5" />
            Live
          </Link>
          <Link href="/information" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>
            <FiInfo className="mr-3 h-5 w-5" />
            Information
          </Link>
        </div>
      </div>
    </nav>
  );
}
