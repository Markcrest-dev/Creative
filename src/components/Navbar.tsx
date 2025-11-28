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
        { name: 'Agency', path: '/about' },
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
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
                    ? 'bg-white/80 backdrop-blur-md shadow-sm py-4'
                    : 'bg-transparent py-6'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="transform transition-transform group-hover:scale-110">
                            <CompactAnimatedLogo />
                        </div>
                        <span className={`text-xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-gray-900' : 'text-gray-900' // Always dark for visibility or dynamic based on page? 
                            // Let's stick to dark for now as most pages are light, but Hero might need adjustment.
                            // Actually, let's make it smart.
                            }`}>
                            CREATIVE<span className="text-orange-500">★</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-all duration-300 relative group ${isActive(link.path) ? 'text-orange-500' : 'text-gray-600 hover:text-black'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`} />
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Cart Button */}
                        <button
                            onClick={toggleCart}
                            className="relative group p-2"
                        >
                            <span className="text-xl transition-transform group-hover:scale-110 block">🛒</span>
                            {items.length > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white"
                                >
                                    {items.length}
                                </motion.span>
                            )}
                        </button>

                        {/* CTA Button */}
                        <Link to="/contact">
                            <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-orange-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25">
                                Start Project
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-2xl text-gray-800"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-white z-30 md:hidden pt-24 px-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="flex flex-col space-y-6 text-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-2xl font-bold ${isActive(link.path) ? 'text-orange-500' : 'text-gray-800'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-8 border-t border-gray-100 flex flex-col gap-4">
                                <button
                                    onClick={() => {
                                        toggleCart();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="flex items-center justify-center gap-2 text-lg font-medium"
                                >
                                    Cart ({items.length}) 🛒
                                </button>
                                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button className="w-full bg-black text-white py-4 rounded-xl text-lg font-bold">
                                        Start Project
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
