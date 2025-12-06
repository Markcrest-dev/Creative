/**
 * Email Configuration Test Utility
 * Run this in browser console to check EmailJS setup
 */

// Check environment variables
console.log('=== EmailJS Configuration Check ===');
console.log('Service ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID || 'MISSING');
console.log('Template ID:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'MISSING');
console.log('Public Key:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'MISSING');

// Test if emailjs library is loaded
import emailjs from '@emailjs/browser';
console.log('EmailJS Library:', emailjs ? 'Loaded ✓' : 'Not Loaded ✗');

// Try to initialize
try {
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  console.log('EmailJS Init: Success ✓');
} catch (error) {
  console.error('EmailJS Init: Failed ✗', error);
}

export const testEmailConfig = () => {
  const config = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  };

  console.log('Current Config:', config);

  if (!config.serviceId || config.serviceId === 'your_service_id') {
    console.error('❌ Service ID not configured properly');
  }
  if (!config.templateId || config.templateId === 'your_template_id') {
    console.error('❌ Template ID not configured properly');
  }
  if (!config.publicKey || config.publicKey === 'your_public_key') {
    console.error('❌ Public Key not configured properly');
  }

  return config;
};
