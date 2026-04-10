import { motion } from 'framer-motion';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    'Ready-Mix Concrete',
    'Concrete Pumping',
    'Batching Plants',
    'Custom Mix Design',
    'Technical Support',
    'Infrastructure Solutions',
  ];

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Fleet', href: '#fleet' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  const socials = [
    { icon: <FiFacebook />, href: 'https://facebook.com', label: 'Facebook', target: '_blank', rel: 'noreferrer' },
    { icon: <FiInstagram />, href: 'https://instagram.com', label: 'Instagram', target: '_blank', rel: 'noreferrer' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <img
                src="/images/logo/DRC-logo.png"
                alt="Deccan Readymix Logo"
                style={{ height: 40, borderRadius: 6 }}
              />
              <div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  letterSpacing: '-0.02em'
                }}>
                  DECCAN READYMIX
                </div>
                <div style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.65rem',
                  color: 'var(--brand-secondary)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>
                  Group of Companies
                </div>
              </div>
            </div>
            <p>
              Delivering premium ready-mix concrete solutions with quality,
              reliability, and innovation for over 15 years. Your trusted
              partner in construction excellence.
            </p>
            <div className="footer-social">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s}>
                  <a href="#services">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4>Contact Info</h4>
            <ul>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <FiPhone style={{ color: 'var(--brand-secondary)', flexShrink: 0, marginTop: 3 }} />
                <a href="tel:+918019921889">+91 80199 21889</a>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <FiMail style={{ color: 'var(--brand-secondary)', flexShrink: 0, marginTop: 3 }} />
                <a href="mailto:Marketing@deccanreadymix.com">Marketing@deccanreadymix.com</a>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <FiMapPin style={{ color: 'var(--brand-secondary)', flexShrink: 0, marginTop: 3 }} />
                <a 
                  href="https://www.google.com/maps?cid=18183186830722339498" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'none' }}
                >
                  DECCAN READY MIX CONCRETE, Hyderabad, Telangana
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Deccan Readymix Group. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
