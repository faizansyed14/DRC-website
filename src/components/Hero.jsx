import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const HERO_BG = '/images/hero/bg2.png';

/* ─── Scroll-linked parallax hero with layered depth ─── */
const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms at different speeds
  const bgY       = useTransform(scrollYProgress, [0, 1], ['0%',  '40%']);
  const bgScale   = useTransform(scrollYProgress, [0, 1], [1,     1.15]);
  const textY     = useTransform(scrollYProgress, [0, 1], ['0%',  '25%']);
  const opacity   = useTransform(scrollYProgress, [0, 0.6], [1,   0]);
  const badgeY    = useTransform(scrollYProgress, [0, 1], ['0px', '-60px']);

  const springBgY = useSpring(bgY, { stiffness: 60, damping: 20 });

  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top:  `${Math.random() * 100}%`,
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 8,
    size: 2 + Math.random() * 5,
  }));

  const headingWords = ['Building', 'The', 'Future', 'With'];
  const accentWords  = ['Concrete', 'Excellence'];

  return (
    <section className="hero" id="home" ref={containerRef}>
      {/* ── Parallax background image ── */}
      <motion.div
        className="hero-bg"
        style={{ y: springBgY, scale: bgScale }}
      >
        <motion.img
          src={HERO_BG}
          alt="Deccan Readymix Fleet"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
      <div className="hero-overlay" />

      {/* ── Floating particles ── */}
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

      {/* ── Glow orbs ── */}
      <motion.div className="glow-orb" style={{ width: 500, height: 500, background: 'rgba(212,172,13,0.12)', top: '10%', right: '5%' }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="glow-orb" style={{ width: 350, height: 350, background: 'rgba(41,128,185,0.12)', bottom: '5%', left: '0%' }}
        animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />

      {/* ── Main content ── */}
      <div className="container">
        <motion.div className="hero-content" style={{ y: textY, opacity }}>



          {/* Animated word-by-word heading */}
          <h1 style={{ marginTop: '80px' }}>
            <span className="line">
              {headingWords.map((word, i) => (
                <motion.span
                  key={word}
                  className="word-reveal"
                  animate={{ opacity: [0, 1, 1, 0], y: [80, 0, 0, -80], rotateX: [-40, 0, 0, 40] }}
                  transition={{ duration: 5, delay: i * 0.2, repeat: Infinity, times: [0, 0.15, 0.85, 1], ease: [0.25, 0.46, 0.45, 0.94] }}
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
                  transition={{ duration: 5, delay: (headingWords.length + i) * 0.2, repeat: Infinity, times: [0, 0.15, 0.85, 1], ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ display: 'inline-block', marginRight: '0.3em', transformOrigin: 'bottom' }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>



          {/* Buttons */}
          <motion.div
            className="hero-buttons"
            style={{ marginTop: '120px' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
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
            transition={{ duration: 0.8, delay: 1.7 }}
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
                transition={{ delay: 1.9 + i * 0.12 }}
              >
                <div className="hero-stat-number">{s.number}</div>
                <div className="hero-stat-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="scroll-mouse"><div className="scroll-dot" /></div>
        <span className="scroll-text">Scroll Down</span>
      </motion.div>
    </section>
  );
};

export default Hero;
