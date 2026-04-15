import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";

const ExperienceSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  const timeline = [
    {
      company: "Sberbank",
      role: t("Product Owner / Stream Lead", "Product Owner / Stream Lead"),
      period: t("2021 — настоящее время", "2021 — Present"),
      items: [
        t("Руководство аналитической платформой", "Led analytics platform"),
        t("Рост MAU +57%", "MAU growth +57%"),
        t("Кросс-функциональная команда из 18 инженеров", "Cross-functional team of 18 engineers"),
        t("Внедрение AI/LLM в аналитику", "Introduced AI/LLM in analytics"),
      ],
    },
    {
      company: "Yamal LNG",
      role: t("Руководитель геотехнического мониторинга", "Head of Geotechnical Monitoring"),
      period: t("2015 — 2021", "2015 — 2021"),
      items: [
        t("Управление инфраструктурой: трубопроводы, СПГ, электростанция", "Managed infrastructure: pipelines, LNG, power plant"),
        t("Снижение затрат на 50%", "Reduced costs by 50%"),
        t("Разработка моделей оценки рисков", "Developed risk assessment models"),
      ],
    },
    {
      company: t("Ранний опыт", "Early Career"),
      role: t("Инженер / Специалист", "Engineer / Specialist"),
      period: t("2007 — 2015", "2007 — 2015"),
      items: [
        t("Инженерные и аналитические позиции в энергетике", "Engineering and analytics roles in energy sector"),
      ],
    },
  ];

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
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`relative pl-8 md:pl-20 ${inView ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-8 top-2 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-primary glow-sm" />

                <div className="glass glass-hover rounded-xl p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="font-display font-bold text-xl">{item.company}</h3>
                      <p className="text-primary text-sm font-medium">{item.role}</p>
                    </div>
                    <span className="text-muted-foreground text-sm mt-1 md:mt-0">{item.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {item.items.map((point, j) => (
                      <li key={j} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
