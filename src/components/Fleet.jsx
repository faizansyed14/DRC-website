import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards, Pagination } from 'swiper/modules';
import { FiCheck } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

const Fleet = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const slides = [
    {
      image: '/images/gallery/business_park.jpg',
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
      image: '/images/gallery/highways.png',
      title: 'Support Fleet',
      subtitle: 'Full logistics backbone',
      features: ['Water tankers', 'Maintenance vehicles', 'Lab mobile units', 'On-call engineers'],
      stat: '20+', statLabel: 'Support Units',
    },
  ];

  const activeSlide = slides[activeIndex];

  return (
    <section className="section fleet-bg" id="fleet">
      {/* Static overlay only — scroll-linked translateY caused jank / extra scroll feel in this section */}
      <div className="fleet-bg-parallax" aria-hidden />

      <div className="container fleet-bg-inner" ref={ref}>
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

        <div className="fleet-layout">
          <motion.div
            className="fleet-carousel-col"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="fleet-cards-swiper-wrapper">
              <Swiper
                modules={[Autoplay, EffectCards, Pagination]}
                effect="cards"
                grabCursor
                centeredSlides
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="fleet-cards-swiper"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
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
            </div>
          </motion.div>

          <motion.div
            className="fleet-copy-col"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              key={activeSlide.title}
              className="fleet-panel-item"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h3>{activeSlide.title}</h3>
              <p className="fleet-panel-sub">{activeSlide.subtitle}</p>
              <ul className="fleet-features-list">
                {activeSlide.features.map((f) => (
                  <li key={f}>
                    <span className="check"><FiCheck /></span> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Fleet;
