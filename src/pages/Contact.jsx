import { motion } from 'framer-motion';
import { Mail, Linkedin, ArrowRight } from 'lucide-react';
import GithubIcon from '../components/icons/GithubIcon';
import { useLang } from '../i18n/LanguageContext';

export default function Contact() {
  const { t } = useLang();

  return (
    <section className="py-32 px-8 bg-dark text-cream overflow-hidden border-t border-cream/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

          <div>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display leading-[0.8] tracking-tighter uppercase"
            >
              {t.contact.titleTop} <br />
              <a
                href="mailto:luiza.desenvolvedora@gmail.com"
                className="text-accent italic hover:line-through transition-all"
              >
                {t.contact.titleAccent}
              </a>
            </motion.h2>
            <p className="mt-8 text-cream/70 max-w-sm italic text-lg">
              {t.contact.text}
            </p>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <a
                href="mailto:luiza.desenvolvedora@gmail.com"
                className="group flex items-center justify-between border-b-2 border-cream/20 py-6 hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Mail size={24} className="text-accent group-hover:scale-110 transition-transform" />
                  <span className="text-xl md:text-xl font-medium tracking-tight">luiza.desenvolvedora@gmail.com</span>
                </div>
                <ArrowRight className="text-accent opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
              </a>

              <div className="flex gap-8 pt-6">
                <a
                  href="https://www.linkedin.com/in/analuiza-vasconcelos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cream hover:text-accent transition-colors group"
                >
                  <Linkedin size={20} />
                  <span className="text-sm uppercase font-bold tracking-widest border-b border-transparent group-hover:border-accent">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/analuizavasconcelos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cream hover:text-accent transition-colors group"
                >
                  <GithubIcon size={20} />
                  <span className="text-sm uppercase font-bold tracking-widest border-b border-transparent group-hover:border-accent">GitHub</span>
                </a>
              </div>
            </div>

            <motion.a
              href="mailto:luiza.desenvolvedora@gmail.com"
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-accent text-dark px-12 py-5 font-display uppercase text-sm tracking-widest shadow-[4px_4px_0px_0px_rgba(243,229,171,1)] active:shadow-none transition-all"
            >
              {t.contact.button}
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
}