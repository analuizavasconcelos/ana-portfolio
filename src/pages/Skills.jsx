import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import {
  SiReact, SiTypescript, SiJavascript, SiTailwindcss,
  SiPhp, SiLaravel, SiPostgresql, SiMysql, SiDocker, SiGit,
} from 'react-icons/si';
import { FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { useLang } from '../i18n/LanguageContext';

const groups = [
  {
    key: 'frontend',
    items: [
      { name: 'React', Icon: SiReact },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'Tailwind', Icon: SiTailwindcss },
      { name: 'HTML', Icon: FaHtml5 },
      { name: 'CSS', Icon: FaCss3Alt },
    ],
  },
  {
    key: 'backend',
    items: [
      { name: 'PHP', Icon: SiPhp },
      { name: 'Laravel', Icon: SiLaravel },
    ],
  },
  {
    key: 'database',
    items: [
      { name: 'PostgreSQL', Icon: SiPostgresql },
      { name: 'MySQL', Icon: SiMysql },
    ],
  },
  {
    key: 'tools',
    items: [
      { name: 'Docker', Icon: SiDocker },
      { name: 'Git', Icon: SiGit },
      { name: 'UI/UX', Icon: Palette },
    ],
  },
];

export default function Skills() {
  const { t } = useLang();

  return (
    <section className="py-24 px-8 w-full bg-dark text-cream border-t border-cream/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs uppercase tracking-[0.4em] text-accent mb-6 block font-bold">
            {t.skills.tag}
          </span>
          <h2 className="text-6xl md:text-8xl font-display leading-[0.85] uppercase tracking-tighter">
            {t.skills.titleTop} <br />
            <span className="text-accent italic text-5xl md:text-7xl">{t.skills.titleAccent}</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
          {groups.map((group, g) => (
            <div key={group.key}>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-[2px] w-8 bg-accent" />
                <h3 className="text-xs text-accent uppercase font-bold tracking-[0.2em]">
                  {t.skills.groups[group.key]}
                </h3>
              </div>

              <div className="flex flex-wrap gap-5">
                {group.items.map(({ name, Icon }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (g * 0.1) + i * 0.06, duration: 0.5 }}
                    style={{ rotate: i % 2 ? 2 : -2 }}
                    whileHover={{ y: -6, rotate: 0 }}
                    className="group flex flex-col items-center justify-center gap-3 w-28 h-28 md:w-32 md:h-32 border-2 border-cream bg-dark text-cream shadow-[4px_4px_0px_0px_var(--color-accent)] hover:bg-accent hover:text-dark hover:shadow-[6px_6px_0px_0px_var(--color-cream)] transition-[background-color,color,box-shadow] duration-300 cursor-default"
                  >
                    <Icon size={36} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">{name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}