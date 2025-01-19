import { FaBluesky, FaXTwitter, FaLinkedin, FaGithub } from 'react-icons/fa6';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <h1 className="text-2xl font-bold mb-6">Contact</h1>

      {/* Contact Information */}
      <section className="mb-8">
        <p>
          If you have any questions or inquiries, feel free to reach out to me through the following
          channels:
        </p>
        <ul className="mt-4 space-y-2">
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:guenthermi50@gmail.com" className="text-blue-600 hover:underline">
              guenthermi50@gmail.com
            </a>
          </li>
          <li>
            <div className="flex items-center space-x-4">
              <strong>Github:</strong>{' '}
              <a
                href="https://github.com/guenthermi/translation-align"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800 transition space-x-2"
              >
                <FaGithub size={20} aria-label="Github" />
                <span>/guenthermi/translation-align</span>
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center space-x-4">
              <strong>Social Media:</strong>
              <ul className="flex space-x-6">
                <li>
                  <a
                    href="https://x.com/michael_g_u"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <FaXTwitter size={24} aria-label="X" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://bsky.app/profile/michael-g-u.bsky.social"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <FaBluesky size={24} aria-label="Bluesky" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/michael-g%C3%BCnther-3519a6133/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <FaLinkedin size={24} aria-label="LinkedIn" />
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}
