import React, { useState } from "react";
import { SearchIcon, ChartPieIcon, DocumentAddIcon, HandIcon, MenuIcon, XIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // For smooth animations

const Navbar = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 text-gray-300 p-4">
      <div className="container mx-auto flex items-center justify-center h-16 relative">
        
        {/* Left Section (Hamburger + Icons) */}
        <div className="absolute left-4 flex items-center space-x-3">
          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XIcon className="h-6 w-6 text-gray-300" /> : <MenuIcon className="h-6 w-6 text-gray-300" />}
          </button>

          {/* Icons (Hidden when screen is small) */}
          <div className={`md:flex space-x-3 ${isMenuOpen ? "hidden" : "flex"}`}>
            <button
              onClick={() => navigate("/analysis")}
              className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition duration-300"
              title="View Analysis"
            >
              <ChartPieIcon className="h-6 w-6 text-gray-300" />
            </button>
            <button
              onClick={() => navigate("/add-book")}
              className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition duration-300"
              title="Add a Book"
            >
              <DocumentAddIcon className="h-6 w-6 text-gray-300" />
            </button>
            <button
              onClick={() => navigate("/issue-book")}
              className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition duration-300"
              title="Issue a Book"
            >
              <img src = "./test2.png" alt = "Book Issuer Icon" className="h-6 w-6 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Center Title (Always Centered) */}
        {!isSearchActive ? (
          <div className="flex-grow flex justify-center">
            <h1 className="text-3xl md:text-4xl font-serif">Library Collection</h1>
          </div>
        ) : (
          <div className="relative w-full max-w-md">
            <input
              type="text"
              autoFocus
              onBlur={() => setIsSearchActive(false)}
              className="w-full p-2 pl-12 bg-gray-800 text-gray-300 placeholder-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
              placeholder="Search books..."
            />
            <SearchIcon className="absolute left-3 top-2.5 h-6 w-6 text-gray-400" />
          </div>
        )}

        {/* Right Section (Search) */}
        <div className="absolute right-4">
          {!isSearchActive && (
            <SearchIcon
              className="h-8 w-8 text-gray-400 cursor-pointer"
              onClick={() => setIsSearchActive(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu (Animated Dropdown) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden flex flex-col space-y-2 mt-3 bg-gray-800 p-3 rounded-md"
          >
            <button
              onClick={() => {
                navigate("/analysis");
                setIsMenuOpen(false);
              }}
              className="p-3 hover:bg-gray-700 rounded-md transition"
            >
              View Analysis
            </button>
            <button
              onClick={() => {
                navigate("/add-book");
                setIsMenuOpen(false);
              }}
              className="p-3 hover:bg-gray-700 rounded-md transition"
            >
              Add a Book
            </button>
            <button
              onClick={() => {
                navigate("/issue-book");
                setIsMenuOpen(false);
              }}
              className="p-3 hover:bg-gray-700 rounded-md transition"
            >
              Issue a Book
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
