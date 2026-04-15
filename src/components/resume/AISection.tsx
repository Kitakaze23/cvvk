import { useLanguage } from "@/contexts/LanguageContext";
import { Brain, Database, Sparkles, GitBranch } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const AISection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  const items = [
    {
      icon: Brain,
      title: t("AI/LLM технологии", "Applied AI/LLM Technologies"),
      desc: t("RAG, AI-агенты, обработка естественного языка", "RAG, AI agents, natural language processing"),
    },
    {
      icon: Database,
      title: t("Data-driven аналитика", "Data-driven Analytics"),
      desc: t("Построение аналитических платформ для 1500+ пользователей", "Built analytics platforms for 1500+ users"),
    },
    {
      icon: Sparkles,
      title: t("Автоматизация инсайтов", "Automated Insight Generation"),
      desc: t("AI-генерация отчётов и рекомендаций", "AI-powered reports and recommendations"),
    },
    {
      icon: GitBranch,
      title: t("Decision workflows", "Decision-making Workflows"),
      desc: t("Оптимизация процессов принятия решений через AI", "AI-enhanced decision-making processes"),
    },
  ];

  return (
    <section id="ai" className="py-32 relative">
      {/* Subtle glow background */}
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
          {items.map((item, i) => (
            <div
              key={i}
              className={`glass glass-hover rounded-xl p-8 group relative overflow-hidden ${
                inView ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <item.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AISection;
