import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { items, removeItem, isCartOpen, toggleCart, total } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        toggleCart();
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                    />

                    {/* Cart Slide-over */}
                    <motion.div
                        className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-50 flex flex-col"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Your Cart ({items.length})</h2>
                            <button onClick={toggleCart} className="text-gray-500 hover:text-black">
                                ✕
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="text-center text-gray-500 mt-10">
                                    <p className="text-xl mb-4">Your cart is empty</p>
                                    <button
                                        onClick={toggleCart}
                                        className="text-orange-500 font-bold hover:underline"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl"
                                    >
                                        <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl ${item.type === 'course' ? 'bg-orange-100' : 'bg-purple-100'}`}>
                                            {item.type === 'course' ? '🎓' : '📦'}
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-gray-900">{item.title}</h3>
                                            <p className="text-gray-500 text-sm capitalize">{item.type}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">${item.price}</p>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-xs text-red-500 hover:text-red-700 mt-1"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600">Total</span>
                                <span className="text-3xl font-bold">${total}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={items.length === 0}
                                className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Checkout Now
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4">
                                Secure Checkout powered by Stripe
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;
