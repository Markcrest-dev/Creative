import Navbar from './Navbar';
import Footer from './Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-24 md:py-32 flex-grow">
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms and Conditions</h1>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-4">Last updated: November 28, 2024</p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Agreement to Terms</h2>
            <p>
              These Terms and Conditions constitute a legally binding agreement made between you,
              whether personally or on behalf of an entity ("you") and Creative★ Agency ("we," "us"
              or "our"), concerning your access to and use of the website as well as any other media
              form, media channel, mobile website or mobile application related, linked, or
              otherwise connected thereto (collectively, the "Site").
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              2. Intellectual Property Rights
            </h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property and all source code,
              databases, functionality, software, website designs, audio, video, text, photographs,
              and graphics on the Site (collectively, the "Content") and the trademarks, service
              marks, and logos contained therein (the "Marks") are owned or controlled by us or
              licensed to us, and are protected by copyright and trademark laws.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. User Representations</h2>
            <p>By using the Site, you represent and warrant that:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                All registration information you submit will be true, accurate, current, and
                complete.
              </li>
              <li>
                You will maintain the accuracy of such information and promptly update such
                registration information as necessary.
              </li>
              <li>
                You have the legal capacity and you agree to comply with these Terms and Conditions.
              </li>
              <li>You are not a minor in the jurisdiction in which you reside.</li>
            </ul>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Products and Services</h2>
            <p>
              We make every effort to display as accurately as possible the colors, features,
              specifications, and details of the products available on the Site. However, we do not
              guarantee that the colors, features, specifications, and details of the products will
              be accurate, complete, reliable, current, or free of other errors, and your electronic
              display may not accurately reflect the actual colors and details of the products.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Contact Us</h2>
            <p>
              In order to resolve a complaint regarding the Site or to receive further information
              regarding use of the Site, please contact us at: legal@creative.agency
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
