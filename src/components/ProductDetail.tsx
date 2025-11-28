import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Octahedron, Box } from '@react-three/drei';
import { useCart } from '../context/CartContext';
import Footer from './Footer';
import Navbar from './Navbar';
import { ALL_PRODUCTS as PRODUCTS, ProductItem } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();

  // Find product by ID (slug)
  // In a real app, this would be an API call
  const product =
    PRODUCTS.find((p: ProductItem) => p.title.toLowerCase().replace(/ /g, '-') === id) || PRODUCTS[0]; // Fallback for demo

  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-24 md:py-32 flex-grow">
        <Link
          to="/services"
          className="inline-flex items-center text-sm font-bold hover:text-orange-500 mb-8 transition-colors"
        >
          ← Back to Store
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: 3D Preview */}
          <motion.div
            className="bg-gray-100 rounded-3xl h-[400px] lg:h-[600px] relative overflow-hidden shadow-inner"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={0.7} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} color={product.color} intensity={0.5} />
              <OrbitControls autoRotate enableZoom={false} />
              {product.type === 'course' ? (
                <Octahedron args={[1.5, 0]}>
                  <meshStandardMaterial color={product.color} metalness={0.8} roughness={0.2} />
                </Octahedron>
              ) : (
                <Box args={[2, 2, 2]}>
                  <meshStandardMaterial color={product.color} metalness={0.6} roughness={0.3} />
                </Box>
              )}
            </Canvas>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${product.type === 'course' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'}`}
              >
                {product.type}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{product.title}</h1>

            <div className="flex items-center space-x-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                ))}
              </div>
              <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
            </div>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{product.description}</p>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
              <h3 className="font-bold mb-4">What's Included:</h3>
              <ul className="space-y-3">
                {product.features?.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-8">
              <div>
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="text-4xl font-bold text-gray-900">${product.price}</p>
              </div>
              <button
                onClick={() =>
                  addItem({
                    id: id || product.title.toLowerCase().replace(/ /g, '-'),
                    title: product.title,
                    price: product.price,
                    type: product.type as 'course' | 'asset',
                  })
                }
                className="bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-500 transition-all transform hover:scale-105 shadow-lg"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
