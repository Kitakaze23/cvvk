import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Mail, Phone, ExternalLink } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const ContactSection = () => {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const { ref, inView } = useInView();

  const c = content.contact || {};
  const email = c.email || "vasiliy@example.com";
  const phone = c.phone || "+70000000000";
  const phoneDisplay = c.phone_display || "+7 (000) 000-00-00";
  const portfolioUrl = c.portfolio_url || "#";
  const description = t(
    c.description_ru || "Открыт для обсуждения продуктовых ролей, консалтинга и партнёрства в сфере Industrial AI.",
    c.description_en || "Open to discuss product roles, consulting, and partnerships in Industrial AI."
  );

  return (
    <section id="contact" className="py-32 relative">
      <div ref={ref} className="max-w-3xl mx-auto px-6 text-center">
        <div className={inView ? "animate-fade-up" : "opacity-0"}>
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">
            {t("Контакт", "Contact")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            {t("Давайте создадим", "Let's build")}
            <br />
            <span className="text-gradient">{t("что-то значимое", "something impactful")}</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            {description}
          </p>
        </div>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-10 ${inView ? "animate-fade-up animate-delay-200" : "opacity-0"}`}>
          <a
            href={`mailto:${email}`}
            className="glass glass-hover rounded-xl px-6 py-4 flex items-center gap-3 justify-center"
          >
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm">{email}</span>
          </a>
          <a
            href={`tel:${phone}`}
            className="glass glass-hover rounded-xl px-6 py-4 flex items-center gap-3 justify-center"
          >
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-sm">{phoneDisplay}</span>
          </a>
          <a
            href={portfolioUrl}
            className="glass glass-hover rounded-xl px-6 py-4 flex items-center gap-3 justify-center"
          >
            <ExternalLink className="w-4 h-4 text-primary" />
            <span className="text-sm">Portfolio</span>
          </a>
        </div>

        <div className={inView ? "animate-fade-up animate-delay-300" : "opacity-0"}>
          <a
            href={`mailto:${email}`}
            className="inline-flex px-10 py-4 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity glow"
          >
            {t("Давайте создадим что-то значимое", "Let's build something impactful")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
