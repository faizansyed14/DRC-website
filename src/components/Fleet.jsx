import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards, Pagination } from 'swiper/modules';
import { FiCheck } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

const Fleet = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-30px', '30px']);

  const slides = [
    {
      image: '/images/services/readymix.png',
      title: 'Transit Mixers',
      subtitle: '6m³ – 12m³ capacity',
      features: ['GPS tracked real-time', 'Automated water system', 'Fresh on-site delivery', 'Multiple capacities'],
      stat: '50+', statLabel: 'Active Mixers',
    },
    {
      image: '/images/fleet/pump_units.png',
      title: 'Boom Pumps',
      subtitle: '60m+ vertical reach',
      features: ['High-rise placement', '360° rotation', 'Precision delivery', 'Certified operators'],
      stat: '15+', statLabel: 'Pump Units',
    },
    {
      image: '/images/fleet/pump_locations.png',
      title: 'Batching Plants',
      subtitle: '120m³/hour output',
      features: ['Fully computerized', 'In-house lab testing', 'Multi-plant network', 'Consistent quality'],
      stat: '5+', statLabel: 'Plant Locations',
    },
    {
      image: '/images/projects/highrise.png',
      title: 'Support Fleet',
      subtitle: 'Full logistics backbone',
      features: ['Water tankers', 'Maintenance vehicles', 'Lab mobile units', 'On-call engineers'],
      stat: '20+', statLabel: 'Support Units',
    },
  ];

  return (
    <section className="section fleet-bg" id="fleet" ref={sectionRef}>
      {/* Scroll-linked background shift */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, y: bgY,
          background: 'radial-gradient(ellipse at 60% 50%, rgba(26,82,118,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">Our Fleet</div>
          <h2 className="section-title">
            Modern <span className="highlight">Equipment</span> & Fleet
          </h2>
          <p className="section-subtitle">
            A fully-maintained, technologically advanced fleet ensuring reliable delivery and superior concrete performance.
          </p>
        </motion.div>

        <div className="fleet-two-col">
          {/* LEFT – Cards Swiper */}
          <motion.div
            className="fleet-cards-swiper-wrapper"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Swiper
              modules={[Autoplay, EffectCards, Pagination]}
              effect="cards"
              grabCursor
              centeredSlides
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="fleet-cards-swiper"
            >
              {slides.map((slide, i) => (
                <SwiperSlide key={i} className="fleet-card-slide">
                  <div className="fleet-card-inner">
                    <img src={slide.image} alt={slide.title} className="fleet-card-img" />
                    <div className="fleet-card-overlay" />
                    <div className="fleet-card-badge">
                      <span className="fcs">{slide.stat}</span>
                      <span className="fcl">{slide.statLabel}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* RIGHT – Content changes with Swiper index */}
          <motion.div
            className="fleet-content-panel"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {slides.map((slide, i) => (
              <motion.div
                key={slide.title}
                className="fleet-panel-item"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              >
                <div className="fleet-panel-number">0{i + 1}</div>
                <h3>{slide.title}</h3>
                <p className="fleet-panel-sub">{slide.subtitle}</p>
                <ul className="fleet-features-list">
                  {slide.features.map(f => (
                    <li key={f}>
                      <span className="check"><FiCheck /></span> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Fleet;
