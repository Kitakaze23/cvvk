import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useInView } from "@/hooks/useInView";
import { getIcon } from "@/utils/iconMap";

const DEFAULT_ICONS = ["Brain", "Database", "Sparkles", "GitBranch"];

const AISection = () => {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const { ref, inView } = useInView();

  const defaults = [
    { title_ru: "AI/LLM технологии", title_en: "Applied AI/LLM Technologies", desc_ru: "RAG, AI-агенты, обработка естественного языка", desc_en: "RAG, AI agents, natural language processing", icon: "Brain" },
    { title_ru: "Data-driven аналитика", title_en: "Data-driven Analytics", desc_ru: "Построение аналитических платформ для 1500+ пользователей", desc_en: "Built analytics platforms for 1500+ users", icon: "Database" },
    { title_ru: "Автоматизация инсайтов", title_en: "Automated Insight Generation", desc_ru: "AI-генерация отчётов и рекомендаций", desc_en: "AI-powered reports and recommendations", icon: "Sparkles" },
    { title_ru: "Decision workflows", title_en: "Decision-making Workflows", desc_ru: "Оптимизация процессов принятия решений через AI", desc_en: "AI-enhanced decision-making processes", icon: "GitBranch" },
  ];

  const items = content.ai?.items || defaults;

  return (
    <section id="ai" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">
            {t("Искусственный интеллект", "Artificial Intelligence")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            AI <span className="text-gradient">Experience</span>
          </h2>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {items.map((item: any, i: number) => {
            const Icon = getIcon(item.icon || DEFAULT_ICONS[i % DEFAULT_ICONS.length]);
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
                <h3 className="font-display font-semibold text-lg mb-2">{t(item.title_ru, item.title_en)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(item.desc_ru, item.desc_en)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AISection;
