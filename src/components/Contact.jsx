import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiPhone, FiMail, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: '', company: '', phone: '', email: '', service: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, company, phone, email, service, message } = formData;
    const text = `*New Website Enquiry* 🏗️

*Name:* ${name}
*Company:* ${company || '-'}
*Phone:* ${phone}
*Email:* ${email}
*Service:* ${service || '-'}

*Project Details:* 
${message}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/918019921889?text=${encodedText}`, '_blank');

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', company: '', phone: '', email: '', service: '', message: '' });
  };

  const contactDetails = [
    {
      icon: <FiPhone />,
      label: 'Phone',
      value: '+91 80199 21889',
    },
    {
      icon: <FiMail />,
      label: 'Email',
      value: 'Marketing@deccanreadymix.com',
    },
    {
      icon: <FiMapPin />,
      label: 'Head Office',
      value: 'Deccan Readymix Group, Industrial Area, Hyderabad',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">Contact Us</div>
          <h2 className="section-title">
            Let's Build <span className="highlight">Together</span>
          </h2>
          <p className="section-subtitle">
            Reach out for a free consultation, custom quote, or any enquiry.
            Our team responds within 24 hours.
          </p>
        </motion.div>

        <motion.div
          className="contact-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Info side */}
          <motion.div className="contact-info" variants={itemVariants}>
            <div>
              <h3>Get In Touch</h3>
              <p>
                Whether you're planning a small residential build or a major
                infrastructure project, our team is here to provide expert
                guidance and the highest quality concrete solutions.
              </p>
            </div>

            <div className="contact-details">
              {contactDetails.map((detail) => (
                <motion.div
                  key={detail.label}
                  className="contact-detail-item"
                  variants={itemVariants}
                  whileHover={{ x: 6 }}
                >
                  <div className="contact-detail-icon">{detail.icon}</div>
                  <div className="contact-detail-content">
                    <h4>{detail.label}</h4>
                    <p>{detail.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Google Maps Embed */}
            <motion.div
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                height: 250,
                border: '1px solid var(--border-color)',
              }}
              variants={itemVariants}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.8735977401607!2d78.4902958!3d17.2733492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba3fce5fac209%3A0x50fa2c38a0a2d6a8!2sS%20DECCAN%20READYMIX%20CONCRETE!5e0!3m2!1sen!2sae!4v1775806859790!5m2!1sen!2sae" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </motion.div>

          {/* Form side */}
          <motion.div className="contact-form-wrapper" variants={itemVariants}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  gap: 16,
                  textAlign: 'center',
                  padding: 40,
                }}
              >
                <motion.div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'rgba(212,172,13,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    color: 'var(--brand-secondary)',
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  ✓
                </motion.div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>
                  Message Sent!
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Thank you for reaching out. Our team will contact you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 80199 21889"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="service">Service Required</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service...</option>
                    <option value="readymix">Ready-Mix Concrete</option>
                    <option value="pumping">Concrete Pumping</option>
                    <option value="plant">Batching Plant</option>
                    <option value="custom">Custom Mix Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Project Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project — volume required, location, timeline..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>
                <div className="form-submit">
                  <motion.button
                    type="submit"
                    className="btn-primary"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Send Message <FiSend />
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
