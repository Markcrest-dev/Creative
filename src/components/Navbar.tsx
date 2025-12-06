import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CompactAnimatedLogo from './CompactAnimatedLogo';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, toggleCart } = useCart();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Store', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`container mx-auto px-6 transition-all duration-500 ${
            isScrolled ? 'max-w-5xl' : 'max-w-7xl'
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? 'bg-white/70 backdrop-blur-xl shadow-lg shadow-black/5 rounded-full px-6 py-3 border border-white/20'
                : 'bg-transparent px-0 py-0'
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <CompactAnimatedLogo />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 relative">
                CREATIVE
                <span className="text-orange-500 inline-block transform transition-transform duration-300 group-hover:rotate-180">
                  ★
                </span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full group ${
                    isActive(link.path) ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="relative group p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
              >
                <span className="text-xl block transform transition-transform duration-300 group-hover:scale-110">
                  🛒
                </span>
                <AnimatePresence>
                  {items.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm"
                    >
                      {items.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* CTA Button */}
              <Link to="/contact">
                <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 flex items-center gap-2 group">
                  <span>Start Project</span>
                  <svg
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-50 p-2 text-gray-800 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current block transition-transform origin-center"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-current block transition-opacity"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current block transition-transform origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-40 md:hidden flex items-center justify-center"
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="flex flex-col space-y-8 text-center p-6 w-full max-w-sm">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-3xl font-bold tracking-tight transition-colors ${
                        isActive(link.path)
                          ? 'text-orange-500'
                          : 'text-gray-900 hover:text-orange-500'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="pt-8 border-t border-gray-100 flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => {
                    toggleCart();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-3 text-lg font-medium text-gray-600 hover:text-gray-900"
                >
                  <span className="bg-gray-100 p-2 rounded-full">🛒</span>
                  Cart ({items.length})
                </button>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full bg-black text-white py-4 rounded-2xl text-lg font-bold shadow-xl hover:bg-orange-500 transition-colors">
                    Start Project
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
