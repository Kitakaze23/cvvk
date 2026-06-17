import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useInView } from "@/hooks/useInView";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, GraduationCap, BookOpen, ExternalLink } from "lucide-react";

const EducationSection = () => {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const { ref, inView } = useInView(0);
  const [open, setOpen] = useState(false);

  const data = content.education || {};
  const items: any[] = data.items || [];
  const courses: any[] = data.courses || [];

  if (!items.length && !courses.length) return null;

  return (
    <section id="education" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">
            {t("Образование", "Education")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            {t("Образование и курсы", "Education & Courses")}
          </h2>
        </div>

        <div ref={ref} className="space-y-6">
          {items.map((item: any, i: number) => (
            <div
              key={i}
              className={`glass glass-hover rounded-xl p-6 md:p-8 ${inView ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                    <h3 className="font-display font-bold text-lg">
                      {t(item.institution_ru, item.institution_en)}
                    </h3>
                    {(item.period_ru || item.period_en) && (
                      <span className="text-muted-foreground text-sm">
                        {t(item.period_ru || "", item.period_en || "")}
                      </span>
                    )}
                  </div>
                  <p className="text-primary text-sm font-medium">{t(item.degree_ru, item.degree_en)}</p>
                  {(item.description_ru || item.description_en) && (
                    <p className="text-muted-foreground text-sm mt-2">
                      {t(item.description_ru || "", item.description_en || "")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {courses.length > 0 && (
            <Collapsible open={open} onOpenChange={setOpen}>
              <div className={`glass rounded-xl ${inView ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${items.length * 120}ms` }}>
                <CollapsibleTrigger className="w-full p-6 md:p-8 flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg">{t("Курсы и сертификаты", "Courses & Certifications")}</h3>
                    <p className="text-muted-foreground text-sm">
                      {courses.length} {t("курсов", "courses")}
                    </p>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-3 border-t border-border/30 pt-4">
                    {courses.map((c: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 py-2">
                        <span className="w-1 h-1 rounded-full bg-primary mt-2.5 shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-sm">{t(c.title_ru, c.title_en)}</span>
                            {c.url && (
                              <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          {(c.provider || c.year) && (
                            <p className="text-muted-foreground text-xs mt-0.5">
                              {[c.provider, c.year].filter(Boolean).join(" • ")}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          )}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
