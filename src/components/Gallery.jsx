import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Gallery = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  // Different parallax speeds for each column — creates 3D depth illusion
  const col1Y = useTransform(scrollYProgress, [0, 1], ['0px',   '-80px']);
  const col2Y = useTransform(scrollYProgress, [0, 1], ['60px',  '-40px']);
  const col3Y = useTransform(scrollYProgress, [0, 1], ['0px',   '-100px']);
  const col4Y = useTransform(scrollYProgress, [0, 1], ['80px',  '-20px']);

  const images = [
    { src: '/images/hero/hero-banner.png',    alt: 'Deccan Fleet',           span: 'tall' },
    { src: '/images/services/readymix.png',   alt: 'Concrete Pour',          span: 'normal' },
    { src: '/images/projects/highrise.png',   alt: 'High-Rise Project',      span: 'normal' },
    { src: '/images/services/pumping.png',    alt: 'Boom Pump in Action',    span: 'tall' },
    { src: '/images/about/plant.png',         alt: 'Batching Plant',         span: 'normal' },
    { src: '/images/projects/bridge.png',     alt: 'Bridge Construction',    span: 'normal' },
    { src: '/images/services/readymix.png',   alt: 'Quality Concrete',       span: 'tall' },
    { src: '/images/projects/highrise.png',   alt: 'Skyline Project',        span: 'normal' },
  ];

  const columns = [
    [images[0], images[1]],
    [images[2], images[3]],
    [images[4], images[5]],
    [images[6], images[7]],
  ];
  const colYs = [col1Y, col2Y, col3Y, col4Y];

  return (
    <section className="section" id="gallery" ref={sectionRef}>
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
            Each column moves at a different depth as you scroll — creating a living, 3D gallery wall.
          </p>
        </motion.div>

        {/* Parallax masonry columns */}
        <div className="parallax-gallery">
          {columns.map((col, ci) => (
            <motion.div
              key={ci}
              className="parallax-col"
              style={{ y: colYs[ci] }}
            >
              {col.map((img, ii) => (
                <motion.div
                  key={ii}
                  className={`parallax-item ${img.span}`}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.7, delay: ci * 0.1 + ii * 0.15 }}
                  whileHover={{ scale: 1.03, zIndex: 10 }}
                  onClick={() => setSelected(img)}
                >
                  <img src={img.src} alt={img.alt} />
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
            <img src={selected.src} alt={selected.alt} />
            <div className="lightbox-caption">{selected.alt}</div>
            <button className="lightbox-close" onClick={() => setSelected(null)}>✕</button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
