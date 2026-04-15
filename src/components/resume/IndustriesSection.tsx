import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Flame, Building2, Brain, Leaf } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const iconMap = [Flame, Building2, Brain, Leaf];

const IndustriesSection = () => {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const { ref, inView } = useInView();

  const defaults = [
    { label_ru: "Энергетика", label_en: "Energy" },
    { label_ru: "Инфраструктура", label_en: "Infrastructure" },
    { label_ru: "AI / Data", label_en: "AI / Data" },
    { label_ru: "Climate Tech", label_en: "Climate Tech" },
  ];

  const industries = content.industries?.items || defaults;

  return (
    <section className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">
            {t("Индустрии", "Industries")}
          </p>
        </div>

        <div ref={ref} className="flex flex-wrap justify-center gap-4 md:gap-6">
          {industries.map((ind: any, i: number) => {
            const Icon = iconMap[i % iconMap.length];
            return (
              <div
                key={i}
                className={`glass glass-hover rounded-xl px-8 py-6 flex items-center gap-3 group ${
                  inView ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-medium text-sm">{t(ind.label_ru, ind.label_en)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
