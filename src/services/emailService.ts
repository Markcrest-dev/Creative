/**
 * Email Service - EmailJS Integration
 * Handles contact form email delivery
 */

import emailjs from '@emailjs/browser';
import { logger } from './logger';

export interface EmailData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  to_name?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

class EmailService {
  private serviceId: string;
  private templateId: string;
  private publicKey: string;
  private initialized: boolean = false;

  constructor() {
    this.serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    this.templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    this.publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

    this.init();
  }

  /**
   * Initialize EmailJS with public key
   */
  private init(): void {
    // Debug logging
    console.log('EmailJS Init Attempt:', {
      serviceId: this.serviceId || 'MISSING',
      templateId: this.templateId || 'MISSING',
      publicKey: this.publicKey ? this.publicKey.substring(0, 5) + '***' : 'MISSING',
    });

    if (!this.serviceId || !this.templateId || !this.publicKey) {
      const msg = 'EmailJS credentials not configured. Email service disabled.';
      logger.warn(msg);
      console.error('❌ ' + msg);
      console.log('Please check your .env file has:');
      console.log('- VITE_EMAILJS_SERVICE_ID');
      console.log('- VITE_EMAILJS_TEMPLATE_ID');
      console.log('- VITE_EMAILJS_PUBLIC_KEY');
      return;
    }

    try {
      emailjs.init(this.publicKey);
      this.initialized = true;
      logger.info('EmailJS initialized successfully');
      console.log('✅ EmailJS initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize EmailJS', error);
      console.error('❌ Failed to initialize EmailJS:', error);
    }
  }

  /**
   * Send email using EmailJS
   */
  async sendEmail(data: EmailData): Promise<EmailResponse> {
    console.log('📧 Attempting to send email...');
    console.log('Initialized:', this.initialized);

    if (!this.initialized) {
      const msg = 'Email service not configured. Please contact us directly.';
      logger.warn('EmailJS not initialized - check environment variables');
      console.error('❌ ' + msg);
      return {
        success: false,
        message: msg,
      };
    }

    try {
      logger.info('Sending email via EmailJS', {
        from: data.from_email,
        subject: data.subject,
      });

      console.log('Sending with:', {
        serviceId: this.serviceId,
        templateId: this.templateId,
        from: data.from_email,
      });

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        {
          from_name: data.from_name,
          from_email: data.from_email,
          subject: data.subject,
          message: data.message,
          to_name: data.to_name || 'Creative Team',
        }
      );

      console.log('✅ Email sent successfully!', response);
      logger.info('Email sent successfully', { status: response.status });

      return {
        success: true,
        message: 'Your message has been sent successfully!',
        messageId: response.text,
      };
    } catch (error) {
      console.error('❌ Email send failed:', error);
      logger.error('Failed to send email', error);

      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email. Please try again.',
      };
    }
  }

  /**
   * Validate email configuration
   */
  isConfigured(): boolean {
    return this.initialized;
  }

  /**
   * Get configuration status for debugging
   */
  getStatus(): { configured: boolean; serviceId: string; templateId: string } {
    return {
      configured: this.initialized,
      serviceId: this.serviceId ? '***' : 'missing',
      templateId: this.templateId ? '***' : 'missing',
    };
  }
}

// Export singleton instance
export const emailService = new EmailService();
