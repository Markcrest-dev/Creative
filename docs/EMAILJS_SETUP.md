# EmailJS Setup Instructions

## Quick Start

To enable the contact form email functionality, you need to set up EmailJS:

### 1. Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Confirm your email address

### 2. Create an Email Service
1. In your EmailJS dashboard, click "Add New Service"
2. Choose your email provider (Gmail, Outlook, etc.)
3. Follow the setup instructions for your provider
4. Note down your **Service ID**

### 3. Create an Email Template
1. Go to "Email Templates" section
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{from_email}}
```

4. Save the template and note down your **Template ID**

### 4. Get Your Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key** (not API key)

### 5. Add to Environment Variables
Create a `.env` file (copy from `.env.example`) and add:

```bash
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 6. Restart Dev Server
```bash
npm run dev
```

## ✅ Testing
1. Navigate to `/contact` page
2. Fill out the form
3. Submit - you should receive an email!

## 🔒 Security Note
- EmailJS public key is safe to expose in client-side code
- Your actual email credentials are stored securely in EmailJS
- Rate limiting is handled by EmailJS (200 emails/month on free tier)

## 📊 Free Tier Limits
- 200 emails per month
- 2 email templates
- 1 email service
- Upgrade for more: [Pricing](https://www.emailjs.com/pricing/)
