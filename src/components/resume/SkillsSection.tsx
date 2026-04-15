import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";

const SkillsSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  const groups = [
    {
      title: "Product",
      skills: [
        t("Стратегия", "Strategy"),
        t("Discovery", "Discovery"),
        t("Roadmap", "Roadmap"),
      ],
    },
    {
      title: "AI / Tech",
      skills: [
        "AI / LLM / RAG",
        "SaaS",
        t("Геопространственная аналитика", "Geospatial Analytics"),
      ],
    },
    {
      title: "Leadership",
      skills: [
        t("Руководство командой", "Team Leadership"),
        t("Работа со стейкхолдерами", "Stakeholder Management"),
        t("Управление рисками", "Risk Management"),
      ],
    },
  ];

  return (
    <section id="skills" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">
            {t("Компетенции", "Competencies")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            {t("Навыки", "Skills")}
          </h2>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {groups.map((g, i) => (
            <div
              key={i}
              className={`glass glass-hover rounded-xl p-8 ${inView ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <h3 className="font-display font-bold text-lg text-gradient mb-6">{g.title}</h3>
              <div className="space-y-3">
                {g.skills.map((s, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
