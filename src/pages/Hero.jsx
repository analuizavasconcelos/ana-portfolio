import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CatFace from '../components/ui/CatFace';
import { useLang } from '../i18n/LanguageContext';

/* Letras arrastáveis */
function Letters({ text, canDrag, offset = 0 }) {
  return Array.from(text).map((ch, i) => (
    <motion.span
      key={i}
      aria-hidden="true"
      drag={canDrag}
      dragSnapToOrigin
      dragElastic={0.7}
      whileHover={{ y: -12, rotate: (i + offset) % 2 ? 5 : -5 }}
      whileTap={{ scale: 1.08 }}
      whileDrag={{ scale: 1.15, zIndex: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      className={`inline-block select-none hover:text-accent transition-colors duration-200 ${
        canDrag ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
    >
      {ch}
    </motion.span>
  ));
}

/* Hero */
export default function Hero() {
  const { t } = useLang();
  const { scrollYProgress } = useScroll();
  const y2k = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const [canDrag, setCanDrag] = useState(false);
  useEffect(() => {
    setCanDrag(window.matchMedia('(pointer: fine)').matches);
  }, []);

  return (
    <div className="bg-dark text-cream selection:bg-accent selection:text-dark">
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden p-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="italic text-accent mb-4 tracking-widest uppercase text-sm md:text-base text-center"
        >
          Ana Vasconcelos - {t.hero.role}
        </motion.p>

        <div className="relative">
          <motion.h1
            aria-label={`${t.hero.titleTop}${t.hero.titleBottom}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-7xl md:text-[12rem] font-display leading-[0.8] text-center uppercase tracking-tighter"
          >
            <Letters text={t.hero.titleTop} canDrag={canDrag} />
            <br />
            <Letters text={t.hero.titleBottom} canDrag={canDrag} offset={1} />
          </motion.h1>

          <motion.div
            style={{ y: y2k }}
            className="absolute -bottom-14 right-0 md:-bottom-16 md:-right-16 z-10"
          >
            <CatFace />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-max max-w-[90vw] text-center text-[10px] uppercase tracking-[0.3em] text-cream/40"
        >
          {canDrag ? t.hero.hintDesktop : t.hero.hintTouch}
        </motion.p>
      </section>

      {/* Barra de progresso no topo */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}