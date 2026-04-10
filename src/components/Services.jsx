import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ── 3D Tilt card on mouse move ── */
const TiltCard = ({ children, className }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    setTilt({ x: y * 18, y: -x * 18 });
    setShine({ x: (e.clientX - left) / width * 100, y: (e.clientY - top) / height * 100 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shine overlay */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 10,
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.12) 0%, transparent 65%)`,
          pointerEvents: 'none',
          transition: 'background 0.08s ease',
        }}
      />
      {children}
    </motion.div>
  );
};

const Services = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 0.4], ['60px', '0px']);
  const titleOp = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const services = [
    {
      emoji: '🏗️',
      title: 'Ready-Mix Concrete',
      desc: 'Premium batches produced in state-of-the-art computerized plants with precise mix designs — M10 to M80 grades.',
      image: '/images/services/readymix.png',
      color: '#1a5276',
      tag: 'Core Service',
    },
    {
      emoji: '🚛',
      title: 'Concrete Pumping',
      desc: 'High-pressure boom pumps reaching 60+ metres vertical. GPS-tracked dispatch for on-time delivery every time.',
      image: '/images/services/pumping.png',
      color: '#d4ac0d',
      tag: 'Popular',
    },
    {
      emoji: '🏭',
      title: 'Batching Plants',
      desc: 'Fully automated plants with 120 m³/hour capacity, in-house labs, and real-time quality monitoring.',
      image: '/images/about/plant.png',
      color: '#2980b9',
      tag: 'Infrastructure',
    },
    {
      emoji: '🔬',
      title: 'Custom Mix Design',
      desc: 'Specialized formulations: high-strength, self-compacting, fiber-reinforced, waterproof, and lightweight mixes.',
      image: '/images/projects/highrise.png',
      color: '#8e44ad',
      tag: 'Specialist',
    },
    {
      emoji: '🌉',
      title: 'Infrastructure Works',
      desc: 'Bridges, flyovers, highways, and dams with high-performance concrete engineered for long-term durability.',
      image: '/images/projects/bridge.png',
      color: '#27ae60',
      tag: 'Large Scale',
    },
    {
      emoji: '👷',
      title: 'Technical Consulting',
      desc: 'On-site engineering support, mix design review, QC assistance, and technical consultation for your project.',
      image: '/images/services/readymix.png',
      color: '#e67e22',
      tag: 'Expert Support',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const cardVariants = {
    hidden:   { opacity: 0, y: 60, scale: 0.92 },
    visible:  { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section className="section services-bg" id="services" ref={sectionRef}>
      <div className="container" ref={ref}>

        <motion.div
          className="section-header"
          style={{ y: titleY, opacity: titleOp }}
        >
          <div className="section-label">Our Services</div>
          <h2 className="section-title">
            Comprehensive <span className="highlight">Concrete</span> Solutions
          </h2>
          <p className="section-subtitle">
            Hover the cards to feel the depth — every service delivered with precision and passion.
          </p>
        </motion.div>

      </div>

      <div style={{ overflow: 'hidden', paddingTop: '20px', paddingBottom: '60px', width: '100%' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: '30px', width: 'fit-content', padding: '0 15px' }}
          whileHover={{ animationPlayState: 'paused' }} /* Optional: Pause on hover if user desires */
        >
          {[...services, ...services].map((s, idx) => (
            <div key={idx} style={{ width: '380px', flexShrink: 0 }}>
              <TiltCard className="service-3d-card" style={{ height: '480px' }}>
                <div className="s3d-image">
                  <img src={s.image} alt={s.title} />
                  <div className="s3d-image-overlay" style={{ background: `linear-gradient(180deg, transparent 30%, ${s.color}dd 100%)` }} />
                  <span className="s3d-tag">{s.tag}</span>
                  <span className="s3d-emoji">{s.emoji}</span>
                </div>
                <div className="s3d-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="s3d-footer">
                    <a className="s3d-link" href="#contact"
                      onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                      Get Quote →
                    </a>
                    <div className="s3d-dot" style={{ background: s.color }} />
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
