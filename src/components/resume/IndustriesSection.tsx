import { useLanguage } from "@/contexts/LanguageContext";
import { Flame, Building2, Brain, Leaf } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const IndustriesSection = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView();

  const industries = [
    { icon: Flame, label: t("Энергетика", "Energy") },
    { icon: Building2, label: t("Инфраструктура", "Infrastructure") },
    { icon: Brain, label: "AI / Data" },
    { icon: Leaf, label: "Climate Tech" },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">
            {t("Индустрии", "Industries")}
          </p>
        </div>

        <div ref={ref} className="flex flex-wrap justify-center gap-4 md:gap-6">
          {industries.map((ind, i) => (
            <div
              key={i}
              className={`glass glass-hover rounded-xl px-8 py-6 flex items-center gap-3 group ${
                inView ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <ind.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm">{ind.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
