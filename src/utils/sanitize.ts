/**
 * Input Sanitization Utilities
 * Protects against XSS attacks by sanitizing user input
 */

import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * Removes all HTML tags and potentially dangerous content
 */
export const sanitizeHTML = (dirty: string): string => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true, // Keep text content
  });
};

/**
 * Sanitize user input for forms
 * Allows basic text but removes scripts and dangerous HTML
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';

  // Remove all HTML tags
  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });

  // Trim whitespace
  return cleaned.trim();
};

/**
 * Sanitize email addresses
 * Basic validation and sanitization
 */
export const sanitizeEmail = (email: string): string => {
  if (!email) return '';

  // Remove HTML and trim
  const cleaned = sanitizeInput(email);

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(cleaned) ? cleaned.toLowerCase() : '';
};

/**
 * Sanitize phone numbers
 * Keeps only digits, spaces, dashes, parentheses, and plus sign
 */
export const sanitizePhone = (phone: string): string => {
  if (!phone) return '';

  // Remove HTML first
  const cleaned = sanitizeInput(phone);

  // Keep only valid phone characters
  return cleaned.replace(/[^0-9\s\-+()\s]/g, '');
};

/**
 * Sanitize URL
 * Ensures URL is safe and uses allowed protocols
 */
export const sanitizeURL = (url: string): string => {
  if (!url) return '';

  try {
    const parsed = new URL(url);

    // Only allow safe protocols
    const allowedProtocols = ['http:', 'https:', 'mailto:'];

    if (!allowedProtocols.includes(parsed.protocol)) {
      return '';
    }

    return DOMPurify.sanitize(url, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
  } catch {
    // Invalid URL
    return '';
  }
};

/**
 * Sanitize object with multiple fields
 * Recursively sanitizes all string values in an object
 */
export const sanitizeObject = <T extends Record<string, unknown>>(obj: T): T => {
  const sanitized = { ...obj };

  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'string') {
      (sanitized as Record<string, unknown>)[key] = sanitizeInput(value);
    } else if (typeof value === 'object' && value !== null) {
      (sanitized as Record<string, unknown>)[key] = sanitizeObject(
        value as Record<string, unknown>
      );
    }
  }

  return sanitized;
};

/**
 * Sanitize form data specifically
 * Applies appropriate sanitization based on field names
 */
export const sanitizeFormData = (data: Record<string, string>): Record<string, string> => {
  const sanitized: Record<string, string> = {};

  for (const key in data) {
    const value = data[key];

    switch (key.toLowerCase()) {
      case 'email':
        sanitized[key] = sanitizeEmail(value);
        break;
      case 'phone':
      case 'telephone':
      case 'mobile':
        sanitized[key] = sanitizePhone(value);
        break;
      case 'url':
      case 'website':
      case 'link':
        sanitized[key] = sanitizeURL(value);
        break;
      default:
        sanitized[key] = sanitizeInput(value);
    }
  }

  return sanitized;
};

/**
 * Check if input contains potentially dangerous content
 * Returns true if input appears malicious
 */
export const containsMaliciousContent = (input: string): boolean => {
  if (!input) return false;

  // Check for common XSS patterns
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // Event handlers like onclick=
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /data:text\/html/i,
  ];

  return dangerousPatterns.some((pattern) => pattern.test(input));
};
