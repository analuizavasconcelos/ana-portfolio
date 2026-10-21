import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cat } from 'lucide-react';
import LangButton from '../button/LangButton';
import { useLang } from '../../i18n/LanguageContext';

const links = [
  { id: 'sobre', key: 'about' },
  { id: 'habilidades', key: 'skills' },
  { id: 'projetos', key: 'projects' },
  { id: 'contato', key: 'contact' },
];

export default function Navbar() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const menuLabel = open
    ? lang === 'pt' ? 'Fechar menu' : 'Close menu'
    : lang === 'pt' ? 'Abrir menu' : 'Open menu';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center pointer-events-none"
      >
        <div className="pointer-events-auto">
          <a
            href="#"
            onClick={() => setOpen(false)}
            className="text-2xl font-display text-accent hover:text-cream transition-colors duration-300"
          >
            <Cat size={28} />
          </a>
        </div>

        {/* Links desktop */}
        <div className="hidden md:flex gap-2 pointer-events-auto bg-dark/50 backdrop-blur-md p-1 border border-cream/10 rounded-full">
          {links.map(({ id, key }) => (
            <a
              key={id}
              href={`#${id}`}
              className="px-6 py-2 text-[10px] uppercase tracking-[0.3em] text-cream hover:bg-accent hover:text-dark transition-all duration-300 rounded-full font-bold"
            >
              {t.nav[key]}
            </a>
          ))}
        </div>

        {/* Idioma + botão do menu mobile */}
        <div className="pointer-events-auto flex items-center gap-3">
          <LangButton />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={menuLabel}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden text-accent p-2"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-dark/95 backdrop-blur-md flex flex-col justify-center px-8"
          >
            <ul className="space-y-8">
              {links.map(({ id, key }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 font-display text-5xl uppercase tracking-tighter text-cream hover:text-accent transition-colors"
                  >
                    <span className="text-xs text-accent font-bold tracking-[0.2em]">
                      0{i + 1}
                    </span>
                    {t.nav[key]}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-16 h-[2px] w-16 bg-accent" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}