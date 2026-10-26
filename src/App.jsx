import Hero from './pages/Hero';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { useLang } from './i18n/LanguageContext';
import Navbar from './components/ui/Navbar';

export default function App() {
  const { t } = useLang();

  return (
    <main className="w-full min-h-screen bg-dark overflow-x-hidden selection:bg-accent selection:text-dark">

      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="sobre" className="scroll-mt-24">
        <About />
      </section>

      <section id="habilidades" className="scroll-mt-24">
        <Skills />
      </section>

      <section id="projetos" className="scroll-mt-24">
        <Projects />
      </section>

      <section id="contato" className="scroll-mt-24">
        <Contact />
      </section>

      <footer className="py-10 text-center text-cream/30 text-[10px] uppercase tracking-widest border-t border-cream/5">
        {t.footer.text}
      </footer>

    </main>
  );
}