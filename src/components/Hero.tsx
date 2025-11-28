import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from './Footer';
import AnimatedLogo from './AnimatedLogo';

// Navigation Bar Component
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 md:p-6">
      {/* Logo */}
      <Link to="/" className="text-xl md:text-2xl font-bold">CREATIVE<span className="text-orange-500">★</span></Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Menu Items */}
      <div className={`absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none ${isMenuOpen ? 'block' : 'hidden'} md:flex md:space-x-6 lg:space-x-8`}>
        <Link to="/" className="block md:inline-block py-3 md:py-0 hover:text-orange-500 transition-colors duration-300 text-base md:text-sm" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/about" className="block md:inline-block py-3 md:py-0 hover:text-orange-500 transition-colors duration-300 text-base md:text-sm" onClick={() => setIsMenuOpen(false)}>Agency</Link>
        <Link to="/services" className="block md:inline-block py-3 md:py-0 hover:text-orange-500 transition-colors duration-300 text-base md:text-sm" onClick={() => setIsMenuOpen(false)}>Services</Link>
        <Link to="/portfolio" className="block md:inline-block py-3 md:py-0 hover:text-orange-500 transition-colors duration-300 text-base md:text-sm" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
        <Link to="/contact" className="block md:inline-block py-3 md:py-0 hover:text-orange-500 transition-colors duration-300 text-base md:text-sm" onClick={() => setIsMenuOpen(false)}>Contact</Link>
      </div>

      {/* Let's Talk Button */}
      <Link to="/contact" className="hidden md:block">
        <button className="bg-black text-white px-4 py-2 md:px-6 md:py-2 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 text-sm md:text-base">
          Let's talk
        </button>
      </Link>
    </nav>
  );
};

// Main Hero Component
const Hero = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <NavBar />

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 md:py-12 flex-grow">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="lg:w-1/2 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Transform Your <span className="text-orange-500">★</span> Digital <span className="text-orange-500">★</span> Experience
            </h1>

            <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
              <span className="bg-gray-200 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide">Innovation</span>
              <span className="bg-gray-200 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide">Design</span>
              <span className="bg-gray-200 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide">Technology</span>
            </div>

            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-xl">
              Elevate your brand with cutting-edge digital solutions that captivate your audience and drive results.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link to="/contact">
                <button className="bg-black text-white w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg text-base md:text-lg">
                  Get Started
                </button>
              </Link>
              <Link to="/portfolio">
                <button className="bg-white border-2 border-gray-300 text-gray-800 w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 font-medium text-base md:text-lg">
                  View Portfolio
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column - Enhanced 3D Logo */}
          <motion.div
            className="lg:w-1/2 w-full h-64 sm:h-80 md:h-96 lg:h-[500px] relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="absolute inset-0 bg-orange-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <AnimatedLogo />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Hero;