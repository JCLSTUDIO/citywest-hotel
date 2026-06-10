import { Link } from 'react-router-dom';
import { HOTEL_NAME, EMAIL } from '@/lib/constants';

export default function TermsOfService() {
  return (
    <>
      <section className="relative min-h-[30vh] flex items-center justify-center bg-espresso pt-20">
        <div className="text-center content-max px-4">
          <h1 className="font-display text-4xl sm:text-5xl text-white mb-4">Terms of Service</h1>
          <p className="text-text-muted text-sm">Last updated: June 2025</p>
        </div>
      </section>

      <section className="section-padding bg-espresso-light">
        <div className="content-max max-w-3xl">
          <div className="glass-panel prose prose-invert max-w-none">
            <h2 className="font-display text-2xl text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              By accessing and using the {HOTEL_NAME} website and services, you accept and agree to be
              bound by these Terms of Service. If you do not agree to these terms, please do not use
              our services.
            </p>

            <h2 className="font-display text-2xl text-white mb-4">2. Booking Policies</h2>
            <h3 className="font-display text-lg text-gold mb-2">Reservations</h3>
            <p className="text-text-muted text-sm mb-4 leading-relaxed">
              All reservations are subject to availability and confirmation. Rates are quoted in Nigerian
              Naira (₦) and are per room per night unless otherwise stated. A valid form of identification
              is required at check-in.
            </p>

            <h3 className="font-display text-lg text-gold mb-2">Check-in and Check-out</h3>
            <ul className="text-text-muted text-sm mb-6 space-y-2 list-disc list-inside">
              <li>Check-in time: 2:00 PM</li>
              <li>Check-out time: 12:00 PM (noon)</li>
              <li>Early check-in and late check-out are subject to availability and may incur additional charges.</li>
            </ul>

            <h3 className="font-display text-lg text-gold mb-2">Cancellation Policy</h3>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              Cancellations made 48 hours or more before the check-in date will receive a full refund.
              Cancellations made within 48 hours of check-in may be subject to a charge equivalent to
              one night&apos;s stay. No-shows will be charged the full booking amount.
            </p>

            <h2 className="font-display text-2xl text-white mb-4">3. Payment Terms</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              {HOTEL_NAME} accepts payment via cash, bank transfer, and major debit/credit cards.
              Online payment processing is handled through secure third-party providers. By providing
              your payment information, you authorize us to charge the applicable fees.
            </p>

            <h2 className="font-display text-2xl text-white mb-4">4. Guest Conduct</h2>
            <p className="text-text-muted text-sm mb-4 leading-relaxed">
              Guests are expected to conduct themselves in a respectful manner. The following are prohibited:
            </p>
            <ul className="text-text-muted text-sm mb-6 space-y-2 list-disc list-inside">
              <li>Excessive noise that disturbs other guests (Quiet hours: 10:00 PM - 7:00 AM)</li>
              <li>Smoking in non-smoking rooms</li>
              <li>Illegal activities on the premises</li>
              <li>Damage to hotel property</li>
              <li>Pets (unless previously arranged and approved)</li>
            </ul>

            <h2 className="font-display text-2xl text-white mb-4">5. Liability</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              {HOTEL_NAME} is not liable for any loss, damage, or theft of personal belongings.
              Guests are advised to use the in-room safe for valuables. The hotel&apos;s liability for
              any claim shall not exceed the total amount paid for the reservation.
            </p>

            <h2 className="font-display text-2xl text-white mb-4">6. Website Use</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              The content on this website is for informational purposes only. We reserve the right to
              modify, suspend, or discontinue any aspect of the website at any time. Unauthorized use
              of this website may give rise to a claim for damages.
            </p>

            <h2 className="font-display text-2xl text-white mb-4">7. Modifications</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              We reserve the right to update these Terms of Service at any time. Continued use of our
              services after changes constitutes acceptance of the revised terms.
            </p>

            <h2 className="font-display text-2xl text-white mb-4">8. Governing Law</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of the Federal
              Republic of Nigeria. Any disputes shall be subject to the exclusive jurisdiction of the
              courts of Ogun State.
            </p>

            <h2 className="font-display text-2xl text-white mb-4">9. Contact Information</h2>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              For questions about these Terms of Service, please contact us at{' '}
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
