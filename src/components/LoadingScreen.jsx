import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'var(--bg-primary)',
        display: 'flex', flexDirection: 'column', 
        alignItems: 'center', justifyContent: 'center'
      }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ textAlign: 'center', marginBottom: 40 }}
      >
        <img 
          src="/images/logo/DRC-logo.png" 
          alt="Deccan Readymix Logo" 
          style={{ width: '180px', height: 'auto', marginBottom: '16px', borderRadius: '12px' }} 
        />
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '1.4rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
        }}>
          DECCAN READYMIX
        </div>
      </motion.div>

      {/* Circular Loading Spinner */}
      <div style={{ position: 'relative', width: 64, height: 64 }}>
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            border: '4px solid rgba(212, 172, 13, 0.1)',
            borderTop: '4px solid #d4ac0d',
            borderRadius: '50%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <div style={{ 
          position: 'absolute', inset: 0, 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.65rem',
          fontWeight: 700, color: '#d4ac0d'
        }}>
          {progress}%
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
