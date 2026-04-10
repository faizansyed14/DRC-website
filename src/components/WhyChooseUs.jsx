import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiTarget, FiZap, FiLayers, FiHeart } from 'react-icons/fi';

const WhyChooseUs = () => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  const reasons = [
    {
      icon: <FiTarget />,
      title: 'Precision Quality',
      desc: 'Every batch undergoes rigorous quality testing in our in-house laboratory ensuring consistent strength and durability.',
    },
    {
      icon: <FiZap />,
      title: 'Rapid Delivery',
      desc: 'GPS-tracked fleet with optimized routes ensures on-time delivery. Our dispatch system guarantees minimal wait times.',
    },
    {
      icon: <FiLayers />,
      title: 'Custom Solutions',
      desc: 'Specialized mix designs tailored to your project needs — from high-strength to lightweight and fiber-reinforced concrete.',
    },
    {
      icon: <FiHeart />,
      title: 'Client Focused',
      desc: 'Dedicated project managers, 24/7 support, and transparent pricing make us the most trusted partner in construction.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <section className="section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">Why Choose Us</div>
          <h2 className="section-title">
            The Deccan <span className="highlight">Advantage</span>
          </h2>
          <p className="section-subtitle">
            What sets us apart is our relentless pursuit of excellence, innovation, and
            customer satisfaction in every cubic meter we deliver.
          </p>
        </motion.div>

        <motion.div
          className="why-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              className="why-card"
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="why-card-icon"
                whileHover={{ rotate: 10, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {reason.icon}
              </motion.div>
              <h3>{reason.title}</h3>
              <p>{reason.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
