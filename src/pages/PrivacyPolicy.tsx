import { Link } from 'react-router-dom';
import { HOTEL_NAME, EMAIL } from '@/lib/constants';

export default function PrivacyPolicy() {
  return (
    <>
      <section className="relative min-h-[30vh] flex items-center justify-center bg-espresso pt-20">
        <div className="text-center content-max px-4">
          <h1 className="font-display text-4xl sm:text-5xl text-white mb-4">Privacy Policy</h1>
          <p className="text-text-muted text-sm">Last updated: June 2025</p>
        </div>
      </section>

      <section className="section-padding bg-espresso-light">
        <div className="content-max max-w-3xl">
          <div className="glass-panel prose prose-invert max-w-none">
            <h2 className="font-display text-2xl text-white mb-4">1. Introduction</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              {HOTEL_NAME} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website or use our services.
            </p>

            <h2 className="font-display text-2xl text-white mb-4">2. Information We Collect</h2>
            <p className="text-text-muted text-sm mb-4 leading-relaxed">
              We may collect the following types of information:
            </p>
            <ul className="text-text-muted text-sm mb-6 space-y-2 list-disc list-inside">
              <li><strong className="text-white">Personal Information:</strong> Name, email address, phone number, and billing information when you make a reservation or contact us.</li>
              <li><strong className="text-white">Booking Information:</strong> Check-in/check-out dates, room preferences, number of guests, and special requests.</li>
              <li><strong className="text-white">Usage Data:</strong> Information about how you access and use our website, including IP address, browser type, and pages visited.</li>
              <li><strong className="text-white">Cookies:</strong> We use cookies to enhance your browsing experience and analyze website traffic.</li>
            </ul>

            <h2 className="font-display text-2xl text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-text-muted text-sm mb-4 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="text-text-muted text-sm mb-6 space-y-2 list-disc list-inside">
              <li>Process and manage your reservations</li>
              <li>Communicate with you about your booking or inquiries</li>
              <li>Provide customer support</li>
              <li>Improve our website and services</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="font-display text-2xl text-white mb-4">4. Data Sharing</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              We do not sell your personal information. We may share your data with trusted third-party
              service providers who assist us in operating our website and conducting our business,
              provided they agree to keep this information confidential.
            </p>

            <h2 className="font-display text-2xl text-white mb-4">5. Data Security</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              We implement appropriate security measures to protect your personal information against
              unauthorized access, alteration, disclosure, or destruction. However, no internet
              transmission is entirely secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="font-display text-2xl text-white mb-4">6. Your Rights</h2>
            <p className="text-text-muted text-sm mb-4 leading-relaxed">
              You have the right to:
            </p>
            <ul className="text-text-muted text-sm mb-6 space-y-2 list-disc list-inside">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>

            <h2 className="font-display text-2xl text-white mb-4">7. Contact Us</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href={`mailto:${EMAIL}`} className="text-gold hover:underline">{EMAIL}</a>.
            </p>

            <div className="pt-6 border-t border-glass-border">
              <Link to="/" className="text-gold text-sm hover:underline">
                &larr; Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
