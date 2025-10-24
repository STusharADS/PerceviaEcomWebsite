import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-white text-xl font-bold">
              <img src="/hello.png" alt="Percevia Logo" className="h-8 w-8 rounded-full object-cover" />
              Percevia
            </Link>
          </div>
          <div className="hidden md:block">
            {isAdmin ? (
              <div className="ml-10">
                <h2 className="text-white text-lg font-semibold">Admin Dashboard</h2>
              </div>
            ) : (
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">About</a>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Features</a>
                <a href="#specs" onClick={(e) => scrollToSection(e, 'specs')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Specifications</a>
                <a href="#demo" onClick={(e) => scrollToSection(e, 'demo')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Demo</a>
                <a href="#download" onClick={(e) => scrollToSection(e, 'download')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Download</a>
                <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">FAQ</a>
                <a href="#pre-order" onClick={(e) => scrollToSection(e, 'pre-order')} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Pre-order</a>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAdmin ? (
              <div className="text-white px-3 py-2">Admin Dashboard</div>
            ) : (
              <>
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">About</a>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Features</a>
                <a href="#specs" onClick={(e) => scrollToSection(e, 'specs')} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Specifications</a>
                <a href="#demo" onClick={(e) => scrollToSection(e, 'demo')} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Demo</a>
                <a href="#download" onClick={(e) => scrollToSection(e, 'download')} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Download</a>
                <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">FAQ</a>
                <a href="#pre-order" onClick={(e) => scrollToSection(e, 'pre-order')} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Pre-order</a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}