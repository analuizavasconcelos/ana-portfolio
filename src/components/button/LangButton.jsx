import { useLang } from '../../i18n/LanguageContext';

export default function LangButton() {
  const { lang, setLang } = useLang();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
      aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para português'}
      className="text-xs font-bold uppercase tracking-widest border-2 border-cream text-cream px-3 py-1 hover:bg-accent hover:border-accent hover:text-dark transition-colors"
    >
      {lang === 'pt' ? 'EN' : 'PT'}
    </button>
  );
}