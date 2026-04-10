import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Fleet', href: '#fleet' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container">
        <a href="#home" className="nav-logo" onClick={() => scrollTo('#home')}>
          <img src="/images/logo/DRC-logo.png" alt="Deccan Readymix Group Logo" />
          <div className="nav-logo-text" style={{ position: 'relative', overflow: 'hidden' }}>
            <motion.div style={{ display: 'flex', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-secondary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {"DECCAN READYMIX".split('').map((char, i) => (
                <motion.span
                  key={i}
                  animate={{ y: ['100%', '0%', '0%', '-100%'], opacity: [0, 1, 1, 0], rotateX: [-90, 0, 0, 90] }}
                  transition={{ duration: 5, repeat: Infinity, delay: i * 0.1, times: [0, 0.15, 0.85, 1], ease: "easeInOut" }}
                  style={{ display: 'inline-block', whiteSpace: 'pre', transformOrigin: 'center' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
            <span className="brand-tagline">Group of Companies</span>
          </div>
        </a>

        <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            >
              <a
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              >
                {item.label}
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <motion.div
              className="theme-toggle-knob"
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {isDark ? <FiMoon size={11} /> : <FiSun size={11} />}
            </motion.div>
          </button>

          <motion.a
            href="#contact"
            className="nav-cta"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Quote
          </motion.a>

          <button
            className={`mobile-menu-btn ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
