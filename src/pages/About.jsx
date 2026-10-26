import { motion } from 'framer-motion';
import anaPhoto from '../assets/img/analu.jpeg';
import { useLang } from '../i18n/LanguageContext';

export default function About() {
  const { t } = useLang();

  return (
    <section className="py-24 px-8 w-full bg-dark text-cream border-t border-cream/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">

        {/* Foto */}
        <div className="md:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group max-w-sm mx-auto md:max-w-none"
          >
            <div className="absolute -inset-2 border-2 border-accent rotate-2 group-hover:rotate-0 transition-transform duration-300" />
            <img
              src={anaPhoto}
              alt="Ana Vasconcelos"
              className="relative z-10 w-full md:grayscale md:hover:grayscale-0 transition duration-500 border-2 border-cream"
            />
            <div className="absolute -bottom-5 -right-3 z-20 bg-accent text-dark font-bold px-4 py-1 -rotate-2 uppercase text-sm">
              {t.about.badge}
            </div>
          </motion.div>
        </div>

        {/* Texto */}
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-accent mb-6 block font-bold">
                {t.about.tag}
              </span>
              <h2 className="text-6xl md:text-8xl font-display leading-[0.85] uppercase tracking-tighter">
                {t.about.titleTop} <br />
                <span className="text-accent italic text-5xl md:text-7xl">{t.about.titleAccent}</span>
              </h2>
            </div>

            <p className="text-3xl md:text-4xl text-cream leading-tight font-medium tracking-tight">
              {t.about.leadBefore}{' '}
              <span className="text-accent italic font-display">{t.about.leadAccent}</span>{' '}
              {t.about.leadAfter}
            </p>

            <div className="space-y-6 text-cream/70 leading-relaxed max-w-2xl text-lg">
              <p>{t.about.body}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}