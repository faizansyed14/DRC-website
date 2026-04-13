import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiShield, FiClock, FiTruck, FiAward, FiCheckCircle } from 'react-icons/fi';

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  // Scroll-linked parallax for image and text moving at different speeds
  const imgScale  = useTransform(scrollYProgress, [0, 1], [1.12, 1.0]);
  const imgY      = useTransform(scrollYProgress, [0, 1], ['40px', '-40px']);
  const textX     = useTransform(scrollYProgress, [0, 0.6], ['60px', '0px']);
  const textOp    = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], ['-8deg', '0deg']);

  const features = [
    { icon: <FiShield />, title: 'ISO Certified Quality', desc: 'All grades tested & certified' },
    { icon: <FiClock  />, title: 'On-Time Delivery',     desc: 'GPS tracked fleet dispatch' },
    { icon: <FiTruck  />, title: '50+ Fleet Vehicles',   desc: 'Modern transit mixers' },
    { icon: <FiAward  />, title: '15+ Years Legacy',     desc: 'Regional market leader' },
  ];

  const itemVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section className="section about-section" id="about" ref={sectionRef}>
      <div className="container" ref={ref}>
        <motion.div className="about-grid">

          {/* ── Image Column with scroll parallax ── */}
          <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
            <motion.div style={{ scale: imgScale, y: imgY, height: '100%' }}>
              <img
                src="/images/about/plant.png"
                alt="Deccan Readymix Batching Plant"
                style={{ width: '100%', height: 520, objectFit: 'cover', display: 'block' }}
              />
            </motion.div>
            <div className="about-image-overlay" />

            {/* Floating badge with scroll rotate */}
            <motion.div
              className="about-image-badge"
              style={{ rotate: badgeRotate }}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <div className="number">15+</div>
              <div className="label">Years of Excellence</div>
            </motion.div>

            {/* Second floating badge */}
            <motion.div
              style={{
                position: 'absolute', top: 24, right: 24,
                padding: '12px 20px',
                background: 'rgba(212,172,13,0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: 'var(--radius-md)',
                color: '#0d2137',
                fontFamily: 'var(--font-accent)',
                fontWeight: 700,
                fontSize: '0.85rem',
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              🏆 ISO Certified
            </motion.div>
          </div>

          {/* ── Text Column with scroll x + opacity ── */}
          <motion.div className="about-content" style={{ x: textX, opacity: textOp }}>
            <motion.div className="section-label" variants={itemVariants}
              initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              About Us
            </motion.div>
            <motion.h3 variants={itemVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.1 }}>
              Pioneering&nbsp;
              <span className="text-gradient">Ready-Mix Concrete</span>&nbsp;
              Across the Region
            </motion.h3>
            <motion.p variants={itemVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.2 }}>
              Deccan Readymix Group is a leading provider of premium ready-mix concrete,
              serving residential, commercial, and infrastructure projects with unwavering
              commitment to quality and timely delivery. With state-of-the-art batching
              plants and a fleet of modern transit mixers, we ensure consistent quality.
            </motion.p>
            <motion.p variants={itemVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.3 }}>
              Our team of experienced engineers and QC professionals work tirelessly
              to exceed international standards — making us the preferred choice for
              builders and developers across the region.
            </motion.p>

            <motion.div className="about-features"
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } } }}>
              {features.map(f => (
                <motion.div
                  key={f.title}
                  className="about-feature"
                  variants={itemVariants}
                  whileHover={{ y: -6, borderColor: 'rgba(212,172,13,0.5)', scale: 1.02 }}
                >
                  <div className="about-feature-icon">{f.icon}</div>
                  <div><h4>{f.title}</h4><p>{f.desc}</p></div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ISO 9001:2015 — text only, two balanced columns */}
        <motion.div
          className="about-cert-panel"
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="about-cert-panel-header">
            <div className="section-label">Quality assurance</div>
            <h3 className="about-cert-main-title">
              ISO <span className="highlight">9001:2015</span> certificate of registration
            </h3>
          </div>
          <div className="about-cert-panel-inner about-cert-panel-inner--text">
            <div className="about-cert-column about-cert-column--left">
              <div className="about-cert-column-icon" aria-hidden>
                <FiAward />
              </div>
              <p className="about-cert-lead">
                <strong>APTS Quality Certifications</strong> certifies that our quality management system
                conforms to <strong>ISO 9001:2015</strong>, issued in line with ISO/IEC 17021 requirements
                for certification bodies.
              </p>
              <p className="about-cert-body">
                <span className="about-cert-kicker">Registered organisation</span>
                <strong className="about-cert-entity">Shree Deccan Readymix Concrete Pvt Ltd</strong>
              </p>
              <p className="about-cert-address">
                SY No. 60–61A, Mallapur Kandukuru, Balapur Mandal, Hyderabad, Ranga Reddy,
                Telangana — 500005.
              </p>
            </div>
            <div className="about-cert-column about-cert-column--right">
              <div className="about-cert-column-icon about-cert-column-icon--accent" aria-hidden>
                <FiCheckCircle />
              </div>
              <p className="about-cert-scope-line">
                <strong>Certified scope</strong> — manufacture and sale of ready-mix concrete.
              </p>
              <ul className="about-cert-meta-list">
                <li>
                  <span>Certificate number</span>
                  <strong>APTS QMS 919</strong>
                </li>
                <li>
                  <span>Initial registration</span>
                  <strong>20 April 2023</strong>
                </li>
                <li>
                  <span>Registration valid through</span>
                  <strong>19 April 2027</strong>
                </li>
                <li>
                  <span>Recertification due</span>
                  <strong>19 April 2029</strong>
                </li>
                <li>
                  <span>Accreditation</span>
                  <strong>SACASP</strong> — Standards Accreditation Council for Assessment Services Providers
                </li>
              </ul>
              <p className="about-cert-footnote">
                Verify accreditation at <span className="about-cert-mono">sacasp.org</span> — issuer{' '}
                <span className="about-cert-mono">aptsquality.com</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
