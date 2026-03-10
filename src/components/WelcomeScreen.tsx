import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeScreenProps {
  onDismiss: () => void;
}

export default function WelcomeScreen({ onDismiss }: WelcomeScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss();
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    setTimeout(() => {
      localStorage.setItem('velour_welcomed', 'true');
      onDismiss();
    }, 600);
  };

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: ['#c9a84c', '#2e8b57', '#7c3aed'][i % 3],
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 4,
    duration: Math.random() * 8 + 8,
  }));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center text-center p-10"
          style={{
            background: '#0a0610',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleDismiss();
          }}
        >
          {/* Background layers */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 800px 600px at 10% 100%, rgba(109,40,217,0.2) 0%, transparent 50%),
                radial-gradient(ellipse 600px 800px at 90% 10%, rgba(201,168,76,0.12) 0%, transparent 50%),
                radial-gradient(ellipse 700px 700px at 70% 50%, rgba(26,77,46,0.1) 0%, transparent 50%)
              `,
            }}
          />

          {/* Noise texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                left: `${particle.left}%`,
                bottom: '-20px',
              }}
              animate={{
                y: [-20, -window.innerHeight - 100],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10 max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Diamond logo */}
            <motion.div
              className="w-12 h-12 mx-auto mb-6"
              style={{
                background: 'linear-gradient(135deg, #c9a84c, #8B6914)',
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
              }}
              animate={{
                filter: [
                  'drop-shadow(0 0 16px rgba(201,168,76,0.7))',
                  'drop-shadow(0 0 32px rgba(201,168,76,1))',
                  'drop-shadow(0 0 16px rgba(201,168,76,0.7))',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* VELOUR text */}
            <h1
              className="mb-4 velour-brand-name"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '64px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                lineHeight: '1.4',
                paddingBottom: '2px',
                overflow: 'visible',
                background: 'linear-gradient(120deg, #f0ebff, #c9a84c, #f0ebff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              VELOUR
            </h1>

            {/* Tagline */}
            <p
              className="tagline mb-3"
              style={{
                fontSize: '18px',
                paddingBottom: '6px',
                overflow: 'visible',
                display: 'block',
                textShadow: '0 0 30px rgba(201,168,76,0.4)',
              }}
            >
              Where Creators Become Empires.
            </p>

            {/* Sub-tagline */}
            <p
              className="mb-4 mx-auto"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                color: '#d4cce8',
                lineHeight: 1.7,
                maxWidth: '520px',
              }}
            >
              Built for every creator everywhere — Lagos to London,
              <br />
              Atlanta to Auckland, male, female, every background.
              <br />
              Your story deserves to be heard.
            </p>

            {/* Decorative divider */}
            <div
              className="mb-8"
              style={{
                color: '#c9a84c',
                fontSize: '10px',
                letterSpacing: '8px',
                opacity: 0.6,
              }}
            >
              ◆ ◆ ◆
            </div>

            {/* Feature pills */}
            <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
              {[
'AI Twin Creation',
    'Viral Scripts',
    'Content Calendar',
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  style={{
                    background: 'rgba(201,168,76,0.08)',
                    border: '1px solid rgba(201,168,76,0.25)',
                    borderRadius: '100px',
                    padding: '8px 18px',
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#d4cce8',
                  }}
                >
                  {feature}
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={handleDismiss}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden mx-auto"
              style={{
                width: '320px',
                height: '56px',
                background: 'linear-gradient(135deg, #1a5c35, #2e8b57, #c9a84c)',
                borderRadius: '14px',
                fontFamily: 'Syne, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#f0ebff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(46,139,87,0.4), 0 0 60px rgba(201,168,76,0.2)',
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <span className="relative z-10">Start Building My Empire →</span>
            </motion.button>

            {/* Below CTA text */}
            <p
              className="mt-3"
              style={{
                fontSize: '11px',
                color: '#9b8fb5',
                fontWeight: 500,
              }}
            >
              No credit card required • Cancel anytime • Used by creators in 50+ countries
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
