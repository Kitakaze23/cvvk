import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const { lang, toggle, t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-display font-bold text-lg tracking-tight">
          <span className="text-gradient">Vasiliy Kolesnikov</span>
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#impact" className="hover:text-foreground transition-colors">{t("Результаты", "Impact")}</a>
          <a href="#ai" className="hover:text-foreground transition-colors">{t("AI", "AI")}</a>
          <a href="#experience" className="hover:text-foreground transition-colors">{t("Опыт", "Experience")}</a>
          <a href="#skills" className="hover:text-foreground transition-colors">{t("Навыки", "Skills")}</a>
          <a href="#contact" className="hover:text-foreground transition-colors">{t("Контакт", "Contact")}</a>
        </div>
        <button
          onClick={toggle}
          className="px-3 py-1.5 text-xs font-medium rounded-md border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all"
        >
          {lang === "ru" ? "EN" : "RU"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
