import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useInView } from "@/hooks/useInView";
import { FolderOpen, ExternalLink } from "lucide-react";

const ProjectsSection = () => {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const { ref, inView } = useInView();

  const defaults = [
    { title_ru: "Платформа мониторинга инфраструктуры", title_en: "Infrastructure monitoring platform", desc_ru: "Концепция и разработка", desc_en: "Concept and development", status: "concept" },
    { title_ru: "Аналитический продукт для SMB", title_en: "Analytics product for SMB", desc_ru: "SberBusiness", desc_en: "SberBusiness", status: "completed" },
    { title_ru: "Система мобильной инспекции", title_en: "Mobile inspection system", desc_ru: "Инфраструктурные объекты", desc_en: "Infrastructure objects", status: "completed" },
  ];

  const items = content.projects?.items || defaults;

  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">
            {t("Портфолио", "Portfolio")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            {t("Избранные проекты", "Selected")} <span className="text-gradient">{t("", "Projects")}</span>
          </h2>
        </div>

        <div ref={ref} className="space-y-4 max-w-3xl mx-auto">
          {items.map((item: any, i: number) => (
            <div
              key={i}
              className={`glass glass-hover rounded-xl p-6 flex items-start gap-4 group ${
                inView ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <FolderOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-display font-semibold text-lg">{t(item.title_ru, item.title_en)}</h3>
                  {item.status === "concept" && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {t("Концепт", "Concept")}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{t(item.desc_ru, item.desc_en)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
