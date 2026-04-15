import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="animate-fade-up">
          <p className="text-primary font-medium text-sm tracking-[0.2em] uppercase mb-6">
            Vasiliy Kolesnikov
          </p>
        </div>

        <h1 className="animate-fade-up animate-delay-100 font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
          Industrial AI
          <br />
          <span className="text-gradient">Product Leader</span>
        </h1>

        <p className="animate-fade-up animate-delay-200 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-4">
          {t(
            "Создаю AI-driven продукты для инфраструктуры и аналитики",
            "Building AI-driven infrastructure and analytics products"
          )}
        </p>

        <p className="animate-fade-up animate-delay-300 text-muted-foreground/70 text-sm max-w-xl mx-auto mb-10">
          {t(
            "17+ лет опыта в энергетике, инфраструктуре и цифровых продуктах",
            "17+ years in energy, infrastructure and digital products"
          )}
        </p>

        <div className="animate-fade-up animate-delay-400 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#experience"
            className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity glow"
          >
            {t("Смотреть опыт", "View Experience")}
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/50 hover:bg-secondary/50 transition-all"
          >
            {t("Связаться", "Contact")}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-up animate-delay-600">
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
