import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useInView } from "@/hooks/useInView";

const VisionSection = () => {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const { ref, inView } = useInView();

  const v = content.vision || {};

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
      <div ref={ref} className="relative max-w-4xl mx-auto px-6 text-center">
        <div className={inView ? "animate-fade-up" : "opacity-0"}>
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-6">
            {t("Видение", "Vision")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {t(v.title_ru || "Строю будущее", v.title_en || "Building the future of")}{" "}
            <span className="text-gradient">{v.highlight || "Infrastructure AI"}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {t(
              v.description_ru || "AI-мониторинг трубопроводов, инфраструктуры и климатических рисков. Применение машинного обучения для предиктивной аналитики промышленных объектов.",
              v.description_en || "AI monitoring for pipelines, infrastructure and climate risks. Applying machine learning for predictive analytics of industrial assets."
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
