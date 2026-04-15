import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, Users, Box, Layers, DollarSign, Zap } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const ImpactSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  const metrics = [
    { icon: TrendingUp, value: "+57%", label: t("Рост MAU", "MAU Growth"), color: "text-emerald-400" },
    { icon: Users, value: "18", label: t("Инженеров в команде", "Engineers in team"), color: "text-blue-400" },
    { icon: Box, value: "1500+", label: t("Пользователей продукта", "Product users"), color: "text-violet-400" },
    { icon: Layers, value: "10+", label: t("Фич отправлено", "Features shipped"), color: "text-amber-400" },
    { icon: DollarSign, value: "-27%", label: t("Снижение затрат", "Cost reduction"), color: "text-emerald-400" },
    { icon: Zap, value: "+42%", label: t("Рост эффективности", "Efficiency gain"), color: "text-primary" },
  ];

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
          {metrics.map((m, i) => (
            <div
              key={i}
              className={`glass glass-hover rounded-xl p-6 md:p-8 text-center group glow-sm ${
                inView ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <m.icon className={`w-6 h-6 mx-auto mb-4 ${m.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
              <div className={`font-display text-3xl md:text-4xl font-bold mb-2 ${m.color}`}>
                {m.value}
              </div>
              <div className="text-muted-foreground text-sm">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
