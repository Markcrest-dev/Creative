import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import AnimatedLogo from './AnimatedLogo';
import Navbar from './Navbar';

// Main Hero Component
const EnhancedHero = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 py-24 md:py-32 flex-grow">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Column */}
          <motion.div
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Transform Your <span className="text-orange-500">★</span> Digital{' '}
              <span className="text-orange-500">★</span> Experience
            </motion.h1>

            <motion.div
              className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="bg-gray-200 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide">
                Innovation
              </span>
              <span className="bg-gray-200 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide">
                Design
              </span>
              <span className="bg-gray-200 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wide">
                Technology
              </span>
            </motion.div>

            <motion.p
              className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Elevate your brand with cutting-edge digital solutions that captivate your audience
              and drive results.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
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
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Animated Logo Scene */}
          <motion.div
            className="lg:w-1/2 w-full h-64 sm:h-80 md:h-96 lg:h-[500px] relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <AnimatedLogo />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EnhancedHero;
