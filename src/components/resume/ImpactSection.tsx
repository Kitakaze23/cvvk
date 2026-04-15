import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useInView } from "@/hooks/useInView";
import { getIcon } from "@/utils/iconMap";

const DEFAULT_ICONS = ["TrendingUp", "Users", "Box", "Layers", "DollarSign", "Zap"];
const colorMap = ["text-emerald-400", "text-blue-400", "text-violet-400", "text-amber-400", "text-emerald-400", "text-primary"];

const ImpactSection = () => {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const { ref, inView } = useInView();

  const defaults = [
    { value: "+57%", label_ru: "Рост MAU", label_en: "MAU Growth", icon: "TrendingUp" },
    { value: "18", label_ru: "Инженеров в команде", label_en: "Engineers in team", icon: "Users" },
    { value: "1500+", label_ru: "Пользователей продукта", label_en: "Product users", icon: "Box" },
    { value: "10+", label_ru: "Фич отправлено", label_en: "Features shipped", icon: "Layers" },
    { value: "-27%", label_ru: "Снижение затрат", label_en: "Cost reduction", icon: "DollarSign" },
    { value: "+42%", label_ru: "Рост эффективности", label_en: "Efficiency gain", icon: "Zap" },
  ];

  const metrics = content.impact?.metrics || defaults;

  return (
    <section id="impact" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">
            {t("Результаты", "Product Impact")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            {t("Измеримый результат", "Measurable Impact")}
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {metrics.map((m: any, i: number) => {
            const Icon = getIcon(m.icon || DEFAULT_ICONS[i % DEFAULT_ICONS.length]);
            const color = colorMap[i % colorMap.length];
            return (
              <div
                key={i}
                className={`glass glass-hover rounded-xl p-6 md:p-8 text-center group glow-sm ${
                  inView ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Icon className={`w-6 h-6 mx-auto mb-4 ${color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                <div className={`font-display text-3xl md:text-4xl font-bold mb-2 ${color}`}>
                  {m.value}
                </div>
                <div className="text-muted-foreground text-sm">{t(m.label_ru, m.label_en)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
