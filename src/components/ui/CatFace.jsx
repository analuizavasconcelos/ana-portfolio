import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useAnimationControls,
} from 'framer-motion';
import { useLang } from '../../i18n/LanguageContext';

// className controla o tamanho do gato
export default function CatFace({ className = 'w-24 md:w-36' }) {
  const { t } = useLang();
  const ref = useRef(null);
  const timer = useRef(null);
  const wiggle = useAnimationControls();
  const [meows, setMeows] = useState(0);
  const [bubble, setBubble] = useState(null);

  // deslocamento dos olhos, com mola para o movimento ficar suave
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const eyeX = useSpring(mx, { stiffness: 220, damping: 18 });
  const eyeY = useSpring(my, { stiffness: 220, damping: 18 });

  useEffect(() => {
    const onMove = (e) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(dist / 150, 1) * 3.5;
      mx.set((dx / dist) * reach);
      my.set((dy / dist) * reach);
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const meow = () => {
    setBubble(t.hero.meows[meows % t.hero.meows.length]);
    setMeows((n) => n + 1);
    wiggle.start({ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setBubble(null), 2200);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {bubble && (
          <motion.div
            key={meows}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute bottom-full right-0 mb-3 w-max max-w-[60vw] bg-cream text-dark text-xs font-bold uppercase tracking-widest px-3 py-2 border-2 border-dark shadow-[3px_3px_0px_0px_var(--color-accent)]"
          >
            {bubble}
          </motion.div>
        )}
      </AnimatePresence>

      {/* flutuação suave quando parado */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.button
          ref={ref}
          type="button"
          onClick={meow}
          animate={wiggle}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={t.hero.catLabel}
          className={`block text-accent cursor-pointer ${className}`}
        >
          <svg viewBox="0 0 100 100" className="w-full h-auto overflow-visible" aria-hidden="true">
            {/* orelhas*/}
            <g fill="currentColor" stroke="currentColor" strokeWidth="10" strokeLinejoin="round">
              <polygon points="22,42 25,24 41,32" />
              <polygon points="78,42 75,24 59,32" />
            </g>
            <g
              fill="var(--color-dark)"
              stroke="var(--color-dark)"
              strokeWidth="4"
              strokeLinejoin="round"
              opacity="0.22"
            >
              <polygon points="26,39 27,30 35,34" />
              <polygon points="74,39 73,30 65,34" />
            </g>

            {/* cabeça */}
            <ellipse cx="50" cy="60" rx="41" ry="32" fill="currentColor" />

            {/* listrinhas na testa */}
            <g stroke="var(--color-dark)" strokeWidth="3" strokeLinecap="round" opacity="0.2">
              <path d="M50 33 V40" />
              <path d="M42 34.5 V39.5" />
              <path d="M58 34.5 V39.5" />
            </g>

            {/* bochechas */}
            <ellipse cx="21" cy="70" rx="6.5" ry="4" fill="var(--color-cream)" opacity="0.3" />
            <ellipse cx="79" cy="70" rx="6.5" ry="4" fill="var(--color-cream)" opacity="0.3" />

            {/* olhos grandes e brilhantes: seguem o cursor e piscam */}
            <motion.g style={{ x: eyeX, y: eyeY }}>
              <motion.g
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ duration: 5, repeat: Infinity, times: [0, 0.9, 0.94, 0.98, 1] }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              >
                <circle cx="34" cy="59" r="8" fill="var(--color-dark)" />
                <circle cx="66" cy="59" r="8" fill="var(--color-dark)" />
                <circle cx="36.6" cy="56.2" r="2.8" fill="var(--color-cream)" />
                <circle cx="68.6" cy="56.2" r="2.8" fill="var(--color-cream)" />
                <circle cx="31.8" cy="62" r="1.4" fill="var(--color-cream)" />
                <circle cx="63.8" cy="62" r="1.4" fill="var(--color-cream)" />
              </motion.g>
            </motion.g>

            {/* narizinho */}
            <ellipse cx="50" cy="67" rx="3.4" ry="2.4" fill="var(--color-dark)" />

            {/* boca: "ω" fechada, ou aberta quando mia */}
            {bubble ? (
              <ellipse cx="50" cy="74" rx="4.5" ry="5" fill="var(--color-dark)" />
            ) : (
              <path
                d="M50 69 V71.5 M43 71.5 Q46.5 77 50 71.5 Q53.5 77 57 71.5"
                stroke="var(--color-dark)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            )}

            {/* bigodes */}
            <g stroke="var(--color-cream)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
              <line x1="4" y1="64" x2="15" y2="65" />
              <line x1="5" y1="72" x2="15" y2="70" />
              <line x1="96" y1="64" x2="85" y2="65" />
              <line x1="95" y1="72" x2="85" y2="70" />
            </g>
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
}