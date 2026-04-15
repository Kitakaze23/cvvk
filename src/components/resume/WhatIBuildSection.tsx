import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useInView } from "@/hooks/useInView";
import { Rocket, BarChart3, Layers, Shield } from "lucide-react";

const iconMap = [Rocket, BarChart3, Layers, Shield];

const WhatIBuildSection = () => {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const { ref, inView } = useInView();

  const defaults = [
    { text_ru: "AI-powered системы мониторинга инфраструктуры", text_en: "AI-powered infrastructure monitoring systems" },
    { text_ru: "Платформы данных для принятия бизнес-решений", text_en: "Data platforms for business decision-making" },
    { text_ru: "Industrial SaaS продукты", text_en: "Industrial SaaS products" },
    { text_ru: "Системы предиктивной аналитики и рисков", text_en: "Risk prediction and analytics systems" },
  ];

  const items = content.what_i_build?.items || defaults;

  return (
    <section id="what-i-build" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">
            {t("Продукты", "Products")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            {t("Что я создаю", "What I")} <span className="text-gradient">{t("", "Build")}</span>
          </h2>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {items.map((item: any, i: number) => {
            const Icon = iconMap[i % iconMap.length];
            return (
              <div
                key={i}
                className={`glass glass-hover rounded-xl p-8 group relative overflow-hidden ${
                  inView ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <p className="font-display font-semibold text-lg">{t(item.text_ru, item.text_en)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIBuildSection;
