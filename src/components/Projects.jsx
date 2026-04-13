import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const customerProjectImages = [
  '/images/projects/img1.jpg',
  '/images/projects/img2.jpg',
  '/images/projects/img3.jpeg',
  '/images/projects/img4.jpeg',
  '/images/projects/img6.jpeg',
  '/images/projects/img7.jpeg',
  '/images/projects/img8.jpeg',
  '/images/projects/img9.jpeg',
  '/images/projects/img10.jpeg',
  '/images/projects/img11.jpeg',
  '/images/projects/img12.jpeg',
  '/images/projects/img13.jpeg',
  '/images/projects/img14.jpeg',
];

const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const titleX = useTransform(scrollYProgress, [0, 0.5], ['-60px', '0px']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const projects = [
    { image: '/images/gallery/skyline_towers.png',   title: 'Skyline Towers',      category: 'Commercial',      volume: '40,000 m³' },
    { image: '/images/gallery/metro_bridge.jpg', title: 'Metro Bridge',   category: 'Infrastructure',  volume: '25,000 m³' },
    { image: '/images/gallery/industrial_complex.jpg',   title: 'Industrial Complex', category: 'Industrial',   volume: '18,000 m³' },
    { image: '/images/gallery/luxuary_residents.jpg',   title: 'Luxury Residences',    category: 'Residential',     volume: '12,000 m³' },
    { image: '/images/gallery/highways.png',           title: 'Highway Expansion', category: 'Infrastructure',  volume: '55,000 m³' },
    { image: '/images/gallery/business_park.jpg',    title: 'Business Park',        category: 'Commercial',      volume: '30,000 m³' },
  ];

  return (
    <section className="section projects-section" id="projects" ref={sectionRef}>
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          style={{ x: titleX, opacity: titleOpacity }}
        >
          <div className="section-label">Portfolio</div>
          <h2 className="section-title">
            Our <span className="highlight">Customers</span> and Projects
          </h2>
          <p className="section-subtitle">
            A glimpse of real sites where our readymix concrete supports construction
            across commercial, residential, and infrastructure work.
          </p>
        </motion.div>

        <motion.div
          className="customer-marquee-wrap"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="customer-marquee-viewport"
            role="region"
            aria-label="Scrolling photos from our customers' projects"
          >
            <div className="customer-marquee-track">
              {[...customerProjectImages, ...customerProjectImages].map((src, i) => (
                <div key={`${src}-${i}`} className="customer-marquee-slide">
                  <img src={src} alt="" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <h3 className="projects-carousel-heading">Landmark project highlights</h3>

        {/* 3D Coverflow Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Swiper
            modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 200,
              modifier: 1.5,
              slideShadows: true,
            }}
            autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation
            className="projects-swiper"
          >
            {projects.map((p, i) => (
              <SwiperSlide key={i} className="project-swiper-slide">
                <div className="project-3d-card">
                  <div className="project-3d-image">
                    <img src={p.image} alt={p.title} />
                    <div className="project-3d-overlay" />
                  </div>
                  <div className="project-3d-content">
                    <span className="project-3d-category">{p.category}</span>
                    <h3>{p.title}</h3>
                    <div className="project-3d-volume">
                      <span className="vol-label">Volume Supplied</span>
                      <span className="vol-value">{p.volume}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
