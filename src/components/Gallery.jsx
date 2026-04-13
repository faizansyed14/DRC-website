import { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiNavigation, FiTruck } from 'react-icons/fi';
import { useMatchMedia } from '../hooks/useMatchMedia';

/**
 * Parallax wall: all images from fleet, gallery, projects (except img1–img14), services.
 * Omit /images/projects/img1.* … img14.* — add any new file paths here when you drop assets in public/.
 */
const PARALLAX_IMAGE_PATHS = [
  '/images/fleet/pump_locations.png',
  '/images/fleet/pump_units.png',
  '/images/gallery/business_park.jpg',
  '/images/gallery/highways.png',
  '/images/gallery/industrial_complex.jpg',
  '/images/gallery/infrastructure_works.jpg',
  '/images/gallery/luxuary_residents.jpg',
  '/images/gallery/map.png',
  '/images/gallery/metro_bridge.jpg',
  '/images/gallery/skyline_towers.png',
  '/images/projects/industries.jpeg',
  '/images/services/technical_consulting.png',
];

function pathToAlt(src) {
  const file = src.split('/').pop() || '';
  const base = file.replace(/\.[^.]+$/, '');
  return base.replace(/[_-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Round-robin into 4 columns for the parallax masonry */
function distributeToColumns(items, columnCount = 4) {
  const cols = Array.from({ length: columnCount }, () => []);
  items.forEach((item, i) => {
    cols[i % columnCount].push(item);
  });
  return cols;
}

/** Zones shown on /images/gallery/map.png — update if your coverage changes */
const SERVICE_ZONES = [
  'Gachibowli', 'Kompally', 'Patancheruvu', 'Shamshabad', 'Uppal', 'Ghatkesar',
  'Boilaram', 'Osman Nagar', 'Rajendra Nagar', 'ORR', 'Teilapur', 'Pradeep',
  'Marigold', 'Serenity', 'Zenith', 'Aqua', 'Zenon', 'Senergy', 'Gandi Maisamma',
  'Kondakal',
];

const Gallery = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [mapRef, mapInView] = useInView({ threshold: 0.12, triggerOnce: true });
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);
  const reducedMotion = useMatchMedia('(prefers-reduced-motion: reduce)');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const col1Y = useTransform(scrollYProgress, [0, 1], ['0px', '-80px']);
  const col2Y = useTransform(scrollYProgress, [0, 1], ['60px', '-40px']);
  const col3Y = useTransform(scrollYProgress, [0, 1], ['0px', '-100px']);
  const col4Y = useTransform(scrollYProgress, [0, 1], ['80px', '-20px']);

  const parallaxImages = useMemo(() => {
    const paths = reducedMotion ? PARALLAX_IMAGE_PATHS.slice(0, 8) : PARALLAX_IMAGE_PATHS;
    return paths.map((src, i) => ({
      src,
      alt: pathToAlt(src),
      span: reducedMotion ? 'normal' : (i % 3 === 0 ? 'tall' : 'normal'),
    }));
  }, [reducedMotion]);

  const columnCount = reducedMotion ? 2 : 4;
  const columns = useMemo(
    () => distributeToColumns(parallaxImages, columnCount),
    [parallaxImages, columnCount]
  );
  const colYs = [col1Y, col2Y, col3Y, col4Y];

  return (
    <section className={`section gallery-section ${reducedMotion ? 'gallery-section--reduced-motion' : ''}`} id="gallery" ref={sectionRef}>
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">Gallery</div>
          <h2 className="section-title">
            Our Work in <span className="highlight">Action</span>
          </h2>
          <p className="section-subtitle">
            See where we supply readymix across Hyderabad — then scroll the full wall: fleet, gallery,
            projects, and services (excluding only the numbered img1–img14 project strips).
          </p>
        </motion.div>

        {/* Service coverage map — Hyderabad footprint */}
        <motion.div
          ref={mapRef}
          className="service-map-showcase"
          initial={{ opacity: 0, y: 36 }}
          animate={mapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="service-map-showcase-bg" aria-hidden />
          <div className="service-map-showcase-inner">
            <div className="service-map-copy">
              <motion.div
                className="service-map-eyebrow"
                initial={{ opacity: 0, x: -16 }}
                animate={mapInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 }}
              >
                <FiNavigation aria-hidden />
                <span>Service coverage</span>
              </motion.div>
              <motion.h3
                className="service-map-heading"
                initial={{ opacity: 0, y: 12 }}
                animate={mapInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 }}
              >
                We deliver across <span className="highlight">Hyderabad</span> &amp; growth corridors
              </motion.h3>
              <motion.p
                className="service-map-lede"
                initial={{ opacity: 0 }}
                animate={mapInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                From IT corridors to industrial belts and ORR-linked townships — our fleet reaches the
                projects marked on this map. Every pour is tracked and timed.
              </motion.p>

              <ul className="service-map-stats" aria-label="Coverage highlights">
                <li>
                  <FiMapPin aria-hidden />
                  <div>
                    <strong>20+</strong>
                    <span>Named delivery zones</span>
                  </div>
                </li>
                <li>
                  <FiTruck aria-hidden />
                  <div>
                    <strong>ORR</strong>
                    <span>Ring-road connected routes</span>
                  </div>
                </li>
                <li>
                  <FiNavigation aria-hidden />
                  <div>
                    <strong>GPS</strong>
                    <span>Live fleet tracking</span>
                  </div>
                </li>
              </ul>

              <p className="service-map-chips-label">Key areas we serve</p>
              <div className="service-zone-chips" role="list">
                {SERVICE_ZONES.map((zone, i) => (
                  <motion.span
                    key={zone}
                    role="listitem"
                    className="service-zone-chip"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={mapInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.08 * Math.min(i, 12) + 0.25 }}
                  >
                    {zone}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.div
              className="service-map-visual"
              initial={{ opacity: 0, x: 28 }}
              animate={mapInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="service-map-frame">
                <div className="service-map-frame-shine" aria-hidden />
                <div className="service-map-corner service-map-corner--tl" aria-hidden />
                <div className="service-map-corner service-map-corner--br" aria-hidden />
                <img
                  src="/images/gallery/map.png"
                  alt="Map of Hyderabad showing Deccan Readymix service locations including Gachibowli, Kompally, Shamshabad, ORR, and surrounding zones"
                  loading="lazy"
                  decoding="async"
                />
                <span className="service-map-floating-tag">HYDERABAD</span>
              </div>
              <p className="service-map-caption">Gold pins = active supply corridors · Updated for our network</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Parallax masonry columns */}
        <div className="parallax-gallery">
          {columns.map((col, ci) => (
            <motion.div
              key={ci}
              className="parallax-col"
              style={reducedMotion ? undefined : { y: colYs[Math.min(ci, 3)] }}
            >
              {col.map((img, ii) => (
                <motion.div
                  key={`${img.src}-${ci}-${ii}`}
                  className={`parallax-item ${img.span}`}
                  initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: reducedMotion ? 0.35 : 0.7, delay: reducedMotion ? 0 : ci * 0.1 + ii * 0.15 }}
                  whileHover={reducedMotion ? undefined : { scale: 1.03, zIndex: 10 }}
                  onClick={() => setSelected(img)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                  <div className="parallax-item-overlay">
                    <span>🔍</span>
                    <p>{img.alt}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            className="lightbox-inner"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            onClick={e => e.stopPropagation()}
          >
            <img src={selected.src} alt={selected.alt} decoding="async" />
            <div className="lightbox-caption">{selected.alt}</div>
            <button className="lightbox-close" onClick={() => setSelected(null)}>✕</button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
