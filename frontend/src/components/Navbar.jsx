import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Logout from "./Logout";

const Navbar = ({
  logoText,
  isTextVisible,
  setIsMobileMenuOpen,
  isMobileMenuOpen,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Handle the dark mode toggle
  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Persist dark mode preference in localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <header
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } shadow-md sticky top-0 z-50 transition-colors duration-300`}
    >
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        {/* Logo with fade transition */}
        <h1
          className={`text-2xl font-bold tracking-wide transition-opacity duration-300 ${
            isTextVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {logoText}
        </h1>

        {/* Desktop Menu */}
        <nav className='hidden md:flex space-x-6 items-center'>
          <button
            onClick={handleToggleDarkMode}
            className='transition-colors hover:text-yellow-500'
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>
          <button
            className='hover:text-yellow-500'
            onClick={() => navigate("/portfolio")}
          >
            Portfolio
          </button>
          <button
            className='hover:text-yellow-500'
            onClick={() => navigate("/watchlist")}
          >
            Watchlist
          </button>
          <button
            className='hover:text-yellow-500'
            onClick={() => navigate("/market-news")}
          >
            Market News
          </button>
          <Logout />
        </nav>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button
            className='text-gray-500 hover:text-gray-700 focus:outline-none'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
          }`}
        >
          <button
            onClick={handleToggleDarkMode}
            className='block w-full px-4 py-2 text-left hover:bg-gray-700'
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>
          <button
            className='block w-full px-4 py-2 text-left hover:bg-gray-700'
            onClick={() => {
              navigate("/portfolio");
              setIsMobileMenuOpen(false);
            }}
          >
            Portfolio
          </button>
          <button
            className='block w-full px-4 py-2 text-left hover:bg-gray-700'
            onClick={() => {
              navigate("/watchlist");
              setIsMobileMenuOpen(false);
            }}
          >
            Watchlist
          </button>
          <button
            className='block w-full px-4 py-2 text-left hover:bg-gray-700'
            onClick={() => {
              navigate("/market-news");
              setIsMobileMenuOpen(false);
            }}
          >
            Market News
          </button>
          <Logout />
        </div>
      )}
    </header>
  );
};
Navbar.propTypes = {
  logoText: PropTypes.string.isRequired, // logoText must be a string and is required
  isTextVisible: PropTypes.bool.isRequired, // isTextVisible must be a boolean and is required
  setIsMobileMenuOpen: PropTypes.func.isRequired, // setIsMobileMenuOpen must be a function and is required
  isMobileMenuOpen: PropTypes.bool.isRequired, // isMobileMenuOpen must be a boolean and is required
};
export default Navbar;
