import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import Footer from './Footer';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';
import { PRODUCT_CATEGORIES } from '../data/products';

// Icon mapping for product types
const getProductIcon = (type: string) => {
  return type === 'course' ? '🎓' : '🎨';
};

// Product/Course Card
const ProductCard = ({ product, index }: { product: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/services/${product.title.toLowerCase().replace(/ /g, '-')}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.title.toLowerCase().replace(/ /g, '-'),
      title: product.title,
      price: product.price,
      type: product.type,
    });
  };

  return (
    <motion.div
      ref={ref}
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full border border-gray-100 cursor-pointer group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -10,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Product Preview Area */}
      <div
        className="h-48 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${product.color}15 0%, ${product.color}40 100%)`,
        }}
      >
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm z-10 uppercase tracking-wider text-gray-600">
          {product.type}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`text-8xl transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}
            style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
          >
            {getProductIcon(product.type)}
          </div>
        </div>
        {/* Decorative circles */}
        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20"
          style={{ backgroundColor: product.color }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-20"
          style={{ backgroundColor: product.color }}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-orange-500 transition-colors">
          {product.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>

        <div className="space-y-3 mt-auto">
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag: string, i: number) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Price</span>
              <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-5 py-2.5 rounded-lg hover:bg-orange-500 transition-colors duration-300 text-sm font-medium shadow-md hover:shadow-lg transform active:scale-95"
            >
              {product.type === 'course' ? 'Enroll Now' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  // Products & Courses Data
  const products = PRODUCT_CATEGORIES;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-black text-white py-16 md:py-24 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f97316" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Level Up Your <span className="text-orange-500">Creative Skills</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Premium courses, digital assets, and tools to help you build better, faster, and more
            creatively.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/30">
              Browse All Products
            </button>
          </motion.div>
        </div>
      </div>

      {/* Products Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-20 flex-grow">
        <div className="space-y-20">
          {products.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <motion.div
                className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-gray-200 pb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                    {category.category}
                  </h2>
                  <p className="text-gray-600 text-lg">{category.description}</p>
                </div>
                <button className="hidden md:block text-orange-500 font-bold hover:text-orange-600 transition-colors mt-4 md:mt-0">
                  View All →
                </button>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((product, index) => (
                  <ProductCard key={index} product={product} index={index} />
                ))}
              </div>

              <div className="md:hidden mt-6 text-center">
                <button className="text-orange-500 font-bold hover:text-orange-600 transition-colors">
                  View All {category.category} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust/Benefits Section */}
        <motion.div
          className="mt-24 bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Learn With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We don't just teach theory. We teach the exact techniques and workflows we use to
              build award-winning projects for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                🎓
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
              <p className="text-gray-600 text-sm">
                Learn from senior developers and designers with 10+ years of industry experience.
              </p>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                🚀
              </div>
              <h3 className="text-xl font-bold mb-2">Project-Based Learning</h3>
              <p className="text-gray-600 text-sm">
                Build real-world projects that you can add to your portfolio immediately.
              </p>
            </div>
            <div className="p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                🔄
              </div>
              <h3 className="text-xl font-bold mb-2">Lifetime Updates</h3>
              <p className="text-gray-600 text-sm">
                Get free updates whenever we add new content or update our techniques.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Services;
