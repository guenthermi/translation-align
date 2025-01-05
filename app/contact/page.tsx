import { FaBluesky, FaXTwitter, FaLinkedin } from 'react-icons/fa6';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

      {/* Contact Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Contact Information</h2>
        <p>
          If you have any questions or inquiries, feel free to reach out to us through the following
          channels:
        </p>
        <ul className="mt-4 space-y-2">
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:info@example.com" className="text-blue-600 hover:underline">
              info@example.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong>{' '}
            <a href="tel:+1234567890" className="text-blue-600 hover:underline">
              +1 (234) 567-890
            </a>
          </li>
          <li>
            <strong>Address:</strong> 123 Main Street, Anytown, USA
          </li>
        </ul>
      </section>

      {/* Social Media Links */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
        <ul className="flex space-x-6">
          <li>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <FaXTwitter size={24} aria-label="X" />
            </a>
          </li>
          <li>
            <a
              href="https://bsky.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <FaBluesky size={24} aria-label="Bluesky" />
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <FaLinkedin size={24} aria-label="LinkedIn" />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
