import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, X } from 'lucide-react';
import GithubIcon from '../components/icons/GithubIcon';
import { useLang } from '../i18n/LanguageContext';

function getYouTubeId(url) {
  const m = url?.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

const projects = [
  {
    id: 1,
    title: 'Xamego Gestor',
    category: {
      pt: 'Projeto pessoal — sistema para negócio familiar',
      en: 'Personal project - system for a family business',
    },
    description: {
      pt: 'Sistema de gestão criado para o negócio da minha família, que vende pães recheados, mini pizzas e salgados para festas. Controla estoque por sabor, kits e vendas. API em Laravel com PostgreSQL, Docker e deploy na nuvem.',
      en: "Management system built for my family's food business, which sells filled breads, mini pizzas and party snacks. It controls stock by flavor, kits and sales. Laravel API with PostgreSQL, Docker and cloud deployment.",
    },

    thumbnail: 'https://img.youtube.com/vi/M_ev2xjd8TU/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=M_ev2xjd8TU',
    repoUrl: null,
  },
  {
    id: 2,
    title: 'ITFABER',
    category: {
      pt: 'Projeto profissional',
      en: 'Professional project',
    },
    description: {
      pt: 'Site desenvolvido durante minha atuação na ITFABER, uma startup. O projeto não chegou a ser finalizado, mas participei do seu desenvolvimento. Código proprietário da empresa, por isso não há repositório.',
      en: 'Website built while I worked at ITFABER, a startup. The project was not completed, but I took part in its development. The code is proprietary, so there is no repository.',
    },
    thumbnail: 'https://img.youtube.com/vi/XA7oQsO4rnM/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=XA7oQsO4rnM',
    repoUrl: null,
  },
  {
    id: 3,
    title: 'ProPsi',
    category: {
      pt: 'Projeto pessoal - SaaS',
      en: 'Personal project - SaaS',
    },
    description: {
      pt: 'Sistema de gestão para psicólogos e clínicas. React, TypeScript, Tailwind, Laravel e PostgreSQL. Vídeo de demonstração em breve.',
      en: 'Management system for psychologists and clinics. React, TypeScript, Tailwind, Laravel and PostgreSQL. Demo video coming soon.',
    },
    thumbnail: 'https://placehold.co/1000x625/1a1a1a/e0e0e0?text=ProPsi',
    videoUrl: '',
    repoUrl: 'https://github.com/analuizavasconcelos/ProPsi',
  },
];

export default function Projects() {
  const { lang, t } = useLang();
  const [active, setActive] = useState(null); 

  // Esc fecha o vídeo e a rolagem da página fica travada enquanto ele está aberto
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  const openVideo = (project) => {
    const id = getYouTubeId(project.videoUrl);
    if (id) setActive({ id, title: project.title });
  };

  return (
    <>
      <section className="py-24 px-8 max-w-7xl mx-auto bg-dark text-cream">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display tracking-tighter uppercase leading-none"
          >
            {t.projects.title}
          </motion.h2>
          <p className="text-cream/60 text-sm max-w-[250px] md:text-right font-medium uppercase tracking-widest">
            {t.projects.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="group relative"
            >
              {/* moldura */}
              <div className="absolute inset-0 border-2 border-accent translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />

              {/* miniatura*/}
              <button
                type="button"
                onClick={() => openVideo(project)}
                disabled={!project.videoUrl}
                aria-label={project.videoUrl ? `${t.projects.watch} ${project.title}` : undefined}
                className={`relative z-10 block w-full aspect-[16/10] overflow-hidden border-2 border-cream bg-dark ${
                  project.videoUrl ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  loading="lazy"
                  className="object-cover w-full h-full md:grayscale md:opacity-80 md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-110 transition-all duration-1000 ease-in-out"
                />

                {project.videoUrl && (
                  <div className="absolute bottom-4 right-4 bg-accent text-dark p-4 border-2 border-dark md:translate-y-20 md:group-hover:translate-y-0 transition-transform duration-500">
                    <PlayCircle size={24} strokeWidth={3} />
                  </div>
                )}
              </button>

              <div className="mt-8 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-display uppercase tracking-tight group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="h-[2px] w-8 bg-accent"></span>
                      <p className="text-xs text-accent uppercase font-bold tracking-[0.2em]">
                        {project.category[lang]}
                      </p>
                    </div>
                  </div>
                  <span className="font-display text-4xl opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-4 text-cream/60 text-sm leading-relaxed max-w-md">
                  {project.description[lang]}
                </p>

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest border-b-2 border-cream/30 pb-1 hover:border-accent hover:text-accent transition-colors"
                  >
                    <GithubIcon size={16} /> {t.projects.repo}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Janela do vídeo */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-dark/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label={lang === 'pt' ? 'Fechar vídeo' : 'Close video'}
              className="absolute top-5 right-5 text-cream hover:text-accent transition-colors"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video bg-black border-2 border-cream shadow-[8px_8px_0px_0px_var(--color-accent)]"
            >
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&playsinline=1`}
                title={active.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}