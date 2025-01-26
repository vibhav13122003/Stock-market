import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        isDarkMode ? "bg-gray-900" : "bg-white"
      } shadow-md sticky top-0 z-50 transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo with fade transition */}
        <h1
          className={`text-2xl font-bold tracking-wide transition-colors logo-text ${
            isTextVisible ? "visible" : "hidden"
          } ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          {logoText}
        </h1>

        {/* Desktop Menu */}
        <nav className="md:flex space-x-6">
          {/* Dark Mode Toggle (First item in the navbar) */}
          <button
            onClick={handleToggleDarkMode}
            className="relative group transition-colors"
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>

          {/* Portfolio */}
          <button
            className={`relative group ${isDarkMode ? "text-white" : "text-gray-900"} hover:text-yellow-500 transition-colors`}
            onClick={() => navigate("/portfolio")}
          >
            Portfolio
            <div className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></div>
          </button>

          {/* Watchlist */}
          <button
            className={`relative group ${isDarkMode ? "text-white" : "text-gray-900"} hover:text-yellow-500 transition-colors`}
            onClick={() => navigate("/watchlist")}
          >
            Watchlist
            <div className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></div>
          </button>

          {/* Market News */}
          <button
            className={`relative group ${isDarkMode ? "text-white" : "text-gray-900"} hover:text-yellow-500 transition-colors`}
            onClick={() => navigate("/market-news")}
          >
            Market News
            <div className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-white transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></div>
          </button>

          {/* Logout */}
          <Logout />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          {/* Dark Mode Toggle (First item in the mobile menu) */}
          <button
            onClick={handleToggleDarkMode}
            className="block px-4 py-2 hover:bg-gray-700"
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>

          <button
            className="block px-4 py-2 hover:bg-gray-700"
            onClick={() => {
              navigate("/portfolio");
              setIsMobileMenuOpen(false);
            }}
          >
            Portfolio
          </button>

          <button
            className="block px-4 py-2 hover:bg-gray-700"
            onClick={() => {
              navigate("/watchlist");
              setIsMobileMenuOpen(false);
            }}
          >
            Watchlist
          </button>

          <button
            className="block px-4 py-2 hover:bg-gray-700"
            onClick={() => {
              navigate("/market-news");
              setIsMobileMenuOpen(false);
            }}
          >
            Market News
          </button>

          {/* Logout */}
          <Logout />
        </div>
      )}
    </header>
  );
};

export default Navbar;
