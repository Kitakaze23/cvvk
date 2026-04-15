import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import avatarFallback from "@/assets/avatar-placeholder.png";
import { Download } from "lucide-react";
import { generateResumePDF } from "@/utils/generatePDF";

const HeroSection = () => {
  const { lang, t } = useLanguage();
  const { content } = useSiteContent();
  const hero = content.hero || {};

  const name = hero.name || "Vasiliy Kolesnikov";
  const line1 = hero.title_line1 || "Industrial AI";
  const line2 = hero.title_line2 || "Product Leader";
  const avatarUrl = hero.avatar_url || avatarFallback;
  const subtitle = t(
    hero.subtitle_ru || "Создаю AI-driven продукты для инфраструктуры и аналитики",
    hero.subtitle_en || "Building AI-driven infrastructure and analytics products"
  );
  const description = t(
    hero.description_ru || "17+ лет опыта в энергетике, инфраструктуре и цифровых продуктах",
    hero.description_en || "17+ years in energy, infrastructure and digital products"
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="animate-fade-up mb-6 flex justify-center">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary/30 glow-sm">
            <img
              src={avatarUrl}
              alt={name}
              width={144}
              height={144}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="animate-fade-up">
          <p className="text-primary font-medium text-sm tracking-[0.2em] uppercase mb-6">
            {name}
          </p>
        </div>

        <h1 className="animate-fade-up animate-delay-100 font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
          {line1}
          <br />
          <span className="text-gradient">{line2}</span>
        </h1>

        <p className="animate-fade-up animate-delay-200 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-4">
          {subtitle}
        </p>

        <p className="animate-fade-up animate-delay-300 text-muted-foreground/70 text-sm max-w-xl mx-auto mb-10">
          {description}
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
          <button
            onClick={() => generateResumePDF(content, lang as "ru" | "en")}
            className="px-8 py-3.5 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/50 hover:bg-secondary/50 transition-all inline-flex items-center gap-2 justify-center"
          >
            <Download className="w-4 h-4" />
            {t("Скачать PDF", "Download PDF")}
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-up animate-delay-600">
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
