import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useInView } from "@/hooks/useInView";

const ExperienceSection = () => {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const { ref, inView } = useInView();

  const defaults = [
    {
      company: "Sberbank", role_ru: "Product Owner / Stream Lead", role_en: "Product Owner / Stream Lead",
      period_ru: "2021 — настоящее время", period_en: "2021 — Present",
      items_ru: ["Руководство аналитической платформой", "Рост MAU +57%", "Кросс-функциональная команда из 18 инженеров", "Внедрение AI/LLM в аналитику"],
      items_en: ["Led analytics platform", "MAU growth +57%", "Cross-functional team of 18 engineers", "Introduced AI/LLM in analytics"],
    },
    {
      company: "Yamal LNG", role_ru: "Руководитель геотехнического мониторинга", role_en: "Head of Geotechnical Monitoring",
      period_ru: "2015 — 2021", period_en: "2015 — 2021",
      items_ru: ["Управление инфраструктурой: трубопроводы, СПГ, электростанция", "Снижение затрат на 50%", "Разработка моделей оценки рисков"],
      items_en: ["Managed infrastructure: pipelines, LNG, power plant", "Reduced costs by 50%", "Developed risk assessment models"],
    },
    {
      company: "Early Career", company_ru: "Ранний опыт", company_en: "Early Career",
      role_ru: "Инженер / Специалист", role_en: "Engineer / Specialist",
      period_ru: "2007 — 2015", period_en: "2007 — 2015",
      items_ru: ["Инженерные и аналитические позиции в энергетике"],
      items_en: ["Engineering and analytics roles in energy sector"],
    },
  ];

  const timeline = content.experience?.timeline || defaults;

  return (
    <section id="experience" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">
            {t("Карьера", "Career")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            {t("Опыт работы", "Experience")}
          </h2>
        </div>

        <div ref={ref} className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-12">
            {timeline.map((item: any, i: number) => {
              const companyName = item.company_ru ? t(item.company_ru, item.company_en || item.company) : item.company;
              return (
                <div
                  key={i}
                  className={`relative pl-8 md:pl-20 ${inView ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="absolute left-0 md:left-8 top-2 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-primary glow-sm" />
                  <div className="glass glass-hover rounded-xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <div>
                        <h3 className="font-display font-bold text-xl">{companyName}</h3>
                        <p className="text-primary text-sm font-medium">{t(item.role_ru, item.role_en)}</p>
                      </div>
                      <span className="text-muted-foreground text-sm mt-1 md:mt-0">{t(item.period_ru, item.period_en)}</span>
                    </div>
                    <ul className="space-y-2">
                      {(t(item.items_ru, item.items_en) as any)?.map((point: string, j: number) => (
                        <li key={j} className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
