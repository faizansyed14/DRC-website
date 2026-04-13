import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useMatchMedia } from '../hooks/useMatchMedia';
import { useTheme } from '../context/ThemeContext';

const HERO_BG_DARK = '/images/hero/bg2.png';
const HERO_BG_LIGHT = '/images/hero/bg1.png';

/* ─── Hero: fixed full-bleed bg; night = bg2, day (light theme) = bg1 with crossfade ─── */
const Hero = () => {
  const { isDark } = useTheme();
  const reducedMotion = useMatchMedia('(prefers-reduced-motion: reduce)');
  const bgFade = { duration: reducedMotion ? 0.2 : 0.55, ease: 'easeInOut' };

  const particleCount = reducedMotion ? 0 : 40;
  const particles = useMemo(() => Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top:  `${Math.random() * 100}%`,
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 8,
    size: 2 + Math.random() * 5,
  })), [particleCount]);

  const headingWords = ['Building', 'The', 'Future', 'With'];
  const accentWords  = ['Concrete', 'Excellence'];

  return (
    <section className={`hero ${reducedMotion ? 'hero--reduced-motion' : ''}`} id="home">
      {/* ── Fixed backgrounds: crossfade on theme toggle ── */}
      <div className="hero-bg">
        <motion.img
          src={HERO_BG_DARK}
          alt={isDark ? 'Deccan Readymix fleet' : ''}
          aria-hidden={!isDark}
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
          className="hero-bg-img"
          initial={false}
          animate={{ opacity: isDark ? 1 : 0 }}
          transition={bgFade}
        />
        <motion.img
          src={HERO_BG_LIGHT}
          alt={!isDark ? 'Deccan Readymix fleet' : ''}
          aria-hidden={isDark}
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
          className="hero-bg-img"
          initial={false}
          animate={{ opacity: isDark ? 0 : 1 }}
          transition={bgFade}
        />
      </div>
      <div className="hero-overlay" />

      {/* ── Floating particles (hidden when user prefers reduced motion) ── */}
      {particleCount > 0 && (
        <div className="hero-particles">
          {particles.map(p => (
            <motion.div
              key={p.id}
              className="particle"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{ y: [0, -160, 0], x: [0, (p.id % 2 === 0 ? 40 : -40), 0], opacity: [0, 0.7, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      {/* ── Glow orbs (omit when prefers reduced motion) ── */}
      {!reducedMotion && (
        <>
          <motion.div className="glow-orb" style={{ width: 500, height: 500, background: 'rgba(212,172,13,0.12)', top: '10%', right: '5%' }}
            animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="glow-orb" style={{ width: 350, height: 350, background: 'rgba(41,128,185,0.12)', bottom: '5%', left: '0%' }}
            animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
        </>
      )}

      {/* ── Main content ── */}
      <div className="container">
        <motion.div className="hero-content">



          {/* Heading: static when prefers reduced motion; else full word animation (all viewports) */}
          {reducedMotion ? (
            <h1 className="hero-heading-static" style={{ marginTop: '80px' }}>
              <span className="line">Building The Future With</span>
              <span className="line hero-heading-static-accent">Concrete Excellence</span>
            </h1>
          ) : (
            <h1 className="hero-heading-motion" style={{ marginTop: '80px' }}>
              <span className="line">
                {headingWords.map((word, i) => (
                  <motion.span
                    key={word}
                    className="word-reveal"
                    animate={{ opacity: [0, 1, 1, 0], y: [80, 0, 0, -80], rotateX: [-40, 0, 0, 40] }}
                    transition={{
                      duration: 5,
                      delay: i * 0.2,
                      repeat: Infinity,
                      times: [0, 0.15, 0.85, 1],
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{ display: 'inline-block', marginRight: '0.3em', transformOrigin: 'bottom' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="line" style={{ display: 'block' }}>
                {accentWords.map((word, i) => (
                  <motion.span
                    key={word}
                    className="highlight word-reveal"
                    animate={{ opacity: [0, 1, 1, 0], y: [80, 0, 0, -80], rotateX: [-40, 0, 0, 40] }}
                    transition={{
                      duration: 5,
                      delay: (headingWords.length + i) * 0.2,
                      repeat: Infinity,
                      times: [0, 0.15, 0.85, 1],
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{ display: 'inline-block', marginRight: '0.3em', transformOrigin: 'bottom' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>
          )}



          {/* Buttons */}
          <motion.div
            className="hero-buttons"
            style={{ marginTop: '120px' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reducedMotion ? 0.25 : 1.4 }}
          >
            <motion.a href="#contact" className="btn-primary"
              whileHover={{ scale: 1.06, y: -4, boxShadow: '0 20px 50px rgba(212,172,13,0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Get A Free Quote →
            </motion.a>
            <motion.a href="#services" className="btn-secondary"
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={e => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Explore Services
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reducedMotion ? 0.35 : 1.7 }}
          >
            {[
              { number: '500+', label: 'Projects Delivered' },
              { number: '15+',  label: 'Years Experience' },
              { number: '50+',  label: 'Fleet Vehicles' },
              { number: '24/7', label: 'Service Available' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="hero-stat"
                whileHover={{ y: -6, scale: 1.08 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (reducedMotion ? 0.45 : 1.9) + i * (reducedMotion ? 0.06 : 0.12) }}
              >
                <div className="hero-stat-number">{s.number}</div>
                <div className="hero-stat-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
