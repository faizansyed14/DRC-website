import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiTruck, FiHome, FiUsers, FiMapPin } from 'react-icons/fi';

const useCountUp = (end, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        raf.current = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [end, duration, start]);

  return count;
};

const StatItem = ({ icon, end, suffix, label, delay, inView }) => {
  const count = useCountUp(end, 2200, inView);

  return (
    <motion.div
      className="stat-item"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.05 }}
    >
      <div className="stat-icon">{icon}</div>
      <div className="stat-number">
        {count}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
};

const Stats = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const stats = [
    { icon: <FiHome />, end: 500, suffix: '+', label: 'Projects Completed', delay: 0 },
    { icon: <FiTruck />, end: 50,  suffix: '+', label: 'Fleet Vehicles',      delay: 0.15 },
    { icon: <FiUsers />, end: 200, suffix: '+', label: 'Skilled Workforce',   delay: 0.30 },
    { icon: <FiMapPin />, end: 10, suffix: '+', label: 'Plant Locations',     delay: 0.45 },
  ];

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} inView={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
