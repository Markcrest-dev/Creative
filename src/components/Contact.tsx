import { useState, useEffect, useRef } from 'react';
import { Mesh } from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import Footer from './Footer';
import Modal from './Modal';
import Tooltip from './Tooltip';
import InteractiveMap from './InteractiveMap';
import Navbar from './Navbar';
import { useFormValidation } from '../hooks/useFormValidation';
import { ApiService } from '../services/apiService';
import { ContactFormData } from '../types/api';
import { motion } from 'framer-motion';

// Animated 3D Contact Icon
const ContactIcon = () => {
  const meshRef = useRef<Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere args={[1, 32, 32]} ref={meshRef} scale={1.5}>
      <MeshDistortMaterial
        color="#f97316"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const Contact = () => {
  const {
    errors,
    touchedFields,
    isSubmitting,
    handleFieldChange,
    handleFieldBlur,
    handleSubmit,
    fieldStates,
  } = useFormValidation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldRenderMap, setShouldRenderMap] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Delay map rendering for performance
  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setShouldRenderMap(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShouldRenderMap(false);
    }
  }, [isModalOpen]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct formData from fieldStates
    const data = {
      name: fieldStates.name?.currentValue || '',
      email: fieldStates.email?.currentValue || '',
      subject: fieldStates.subject?.currentValue || '',
      message: fieldStates.message?.currentValue || '',
    };

    await handleSubmit(data, async (validData) => {
      await ApiService.submitContactForm(validData as unknown as ContactFormData);
      setIsSubmitted(true);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleFieldChange(name, value);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    handleFieldBlur(name);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      {/* Contact Content */}
      <div className="container mx-auto px-4 sm:px-6 py-24 md:py-32 flex-grow">
        <div className="text-center mb-10 md:mb-16">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Creative★
          </motion.h1>
          <motion.p
            className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto px-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Have a project in mind? We'd love to hear from you. Send us a message and we'll respond
            as soon as possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 md:p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Send us a message</h2>

            {isSubmitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                <p>Thank you for your message! We'll get back to you soon.</p>
              </div>
            ) : null}

            {errors.submit && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <p>{errors.submit}</p>
              </div>
            )}

            <form onSubmit={onSubmit} noValidate>
              <div className="mb-5 md:mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={fieldStates.name?.currentValue || ''}
                  onChange={handleChange}
                  onBlur={onBlur}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base ${errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  required
                />
                {touchedFields.name && errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
                {fieldStates.name && !errors.name && fieldStates.name.currentValue && (
                  <p className="text-green-500 text-sm mt-1">✓ Looks good!</p>
                )}
              </div>

              <div className="mb-5 md:mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={fieldStates.email?.currentValue || ''}
                  onChange={handleChange}
                  onBlur={onBlur}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  required
                />
                {touchedFields.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
                {fieldStates.email && !errors.email && fieldStates.email.currentValue && (
                  <p className="text-green-500 text-sm mt-1">✓ Valid email!</p>
                )}
              </div>

              <div className="mb-5 md:mb-6">
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={fieldStates.subject?.currentValue || ''}
                  onChange={handleChange}
                  onBlur={onBlur}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base ${errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                  required
                />
                {touchedFields.subject && errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
                {fieldStates.subject && !errors.subject && fieldStates.subject.currentValue && (
                  <p className="text-green-500 text-sm mt-1">✓ Good subject!</p>
                )}
              </div>

              <div className="mb-5 md:mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2 text-sm md:text-base"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={fieldStates.message?.currentValue || ''}
                  onChange={handleChange}
                  onBlur={onBlur}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base ${errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  required
                ></textarea>
                {touchedFields.message && errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
                {fieldStates.message && !errors.message && fieldStates.message.currentValue && (
                  <p className="text-green-500 text-sm mt-1">✓ Great message!</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white px-6 py-4 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg md:text-xl mb-1">Phone</h3>
                    <p className="text-gray-600 text-sm md:text-base">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg md:text-xl mb-1">Email</h3>
                    <p className="text-gray-600 text-sm md:text-base">hello@creative-star.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg md:text-xl mb-1">Office</h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      123 Creative Street
                      <br />
                      Design District, CA 90210
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg md:text-xl mb-1">Business Hours</h3>
                    <p className="text-gray-600 text-sm md:text-base">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-gray-600 text-sm md:text-base">Saturday: 10AM - 4PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Tooltip content="Click to see our office on Google Maps" position="top">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    View Office Location
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* 3D Visualization */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Let's Connect</h2>
              <div className="h-48 sm:h-56 md:h-64 relative">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <ContactIcon />
                  <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={1}
                    // Disable orbit controls on mobile for better UX
                    enabled={window.innerWidth > 768}
                  />
                </Canvas>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Office Location Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Our Office Location"
        size="lg"
      >
        {shouldRenderMap ? (
          <InteractiveMap height="400px" />
        ) : (
          <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Creative★ Agency</h3>
          <p className="text-gray-600">123 Creative Street, Design District, CA 90210</p>
          <p className="text-gray-600 mt-2">Phone: +1 (555) 123-4567</p>
          <p className="text-gray-600">Email: hello@creative-star.com</p>
        </div>
      </Modal>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
