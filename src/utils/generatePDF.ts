import jsPDF from "jspdf";

interface SiteContent {
  [section: string]: any;
}

export const generateResumePDF = (content: SiteContent, lang: "ru" | "en") => {
  const t = (ru: string, en: string) => (lang === "ru" ? ru : en);
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  const addPageIfNeeded = (needed: number) => {
    if (y + needed > 280) {
      doc.addPage();
      y = 20;
    }
  };

  const drawLine = () => {
    doc.setDrawColor(200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  };

  // --- HEADER ---
  const hero = content.hero || {};
  const name = hero.name || "Vasiliy Kolesnikov";
  const titleLine1 = hero.title_line1 || "Industrial AI";
  const titleLine2 = hero.title_line2 || "Product Leader";

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(name, pageWidth / 2, y, { align: "center" });
  y += 9;

  doc.setFontSize(14);
  doc.setTextColor(80, 80, 80);
  doc.text(`${titleLine1} ${titleLine2}`, pageWidth / 2, y, { align: "center" });
  y += 7;

  const subtitle = t(
    hero.subtitle_ru || "Создаю AI-driven продукты для инфраструктуры и аналитики",
    hero.subtitle_en || "Building AI-driven infrastructure and analytics products"
  );
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(subtitle, pageWidth / 2, y, { align: "center" });
  y += 5;

  const description = t(
    hero.description_ru || "17+ лет опыта в энергетике, инфраструктуре и цифровых продуктах",
    hero.description_en || "17+ years in energy, infrastructure and digital products"
  );
  doc.text(description, pageWidth / 2, y, { align: "center" });
  y += 8;

  // --- CONTACT INFO ---
  const contact = content.contact || {};
  const contactParts: string[] = [];
  if (contact.email) contactParts.push(contact.email);
  if (contact.phone_display) contactParts.push(contact.phone_display);
  if (contact.linkedin_url) contactParts.push(contact.linkedin_url);

  if (contactParts.length) {
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(contactParts.join("  |  "), pageWidth / 2, y, { align: "center" });
    y += 8;
  }

  drawLine();

  // --- IMPACT ---
  const impactDefaults = [
    { value: "+57%", label_ru: "Рост MAU", label_en: "MAU Growth" },
    { value: "18", label_ru: "Инженеров в команде", label_en: "Engineers in team" },
    { value: "1500+", label_ru: "Пользователей продукта", label_en: "Product users" },
    { value: "-27%", label_ru: "Снижение затрат", label_en: "Cost reduction" },
  ];
  const metrics = content.impact?.metrics || impactDefaults;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(0);
  doc.text(t("РЕЗУЛЬТАТЫ", "KEY IMPACT"), margin, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);

  metrics.forEach((m: any) => {
    addPageIfNeeded(6);
    doc.setFont("helvetica", "bold");
    doc.text(`${m.value}`, margin + 2, y);
    doc.setFont("helvetica", "normal");
    doc.text(` — ${t(m.label_ru, m.label_en)}`, margin + 2 + doc.getTextWidth(`${m.value} `), y);
    y += 6;
  });
  y += 4;
  drawLine();

  // --- EXPERIENCE ---
  const expDefaults = [
    {
      company: "Sberbank", role_ru: "Product Owner / Stream Lead", role_en: "Product Owner / Stream Lead",
      period_ru: "2021 — настоящее время", period_en: "2021 — Present",
      items_ru: ["Руководство аналитической платформой", "Рост MAU +57%"],
      items_en: ["Led analytics platform", "MAU growth +57%"],
    },
  ];
  const timeline = content.experience?.timeline || expDefaults;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(0);
  doc.text(t("ОПЫТ РАБОТЫ", "EXPERIENCE"), margin, y);
  y += 8;

  timeline.forEach((item: any) => {
    addPageIfNeeded(20);
    const companyName = item.company_ru ? t(item.company_ru, item.company_en || item.company) : item.company;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(companyName, margin + 2, y);

    const period = t(item.period_ru, item.period_en);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(period, pageWidth - margin, y, { align: "right" });
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(t(item.role_ru, item.role_en), margin + 2, y);
    y += 6;

    const bullets = t(item.items_ru, item.items_en) as string[] | undefined;
    if (bullets) {
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      bullets.forEach((b: string) => {
        addPageIfNeeded(5);
        const lines = doc.splitTextToSize(`• ${b}`, contentWidth - 4);
        doc.text(lines, margin + 4, y);
        y += lines.length * 4.5;
      });
    }
    y += 4;
  });

  drawLine();

  // --- AI EXPERIENCE ---
  const aiDefaults = [
    { title_ru: "AI/LLM технологии", title_en: "Applied AI/LLM Technologies", desc_ru: "RAG, AI-агенты", desc_en: "RAG, AI agents" },
  ];
  const aiItems = content.ai?.items || aiDefaults;

  addPageIfNeeded(15);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(0);
  doc.text("AI EXPERIENCE", margin, y);
  y += 7;

  doc.setFontSize(10);
  aiItems.forEach((item: any) => {
    addPageIfNeeded(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text(t(item.title_ru, item.title_en), margin + 2, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const lines = doc.splitTextToSize(t(item.desc_ru, item.desc_en), contentWidth - 4);
    doc.text(lines, margin + 2, y);
    y += lines.length * 4.5 + 3;
  });

  drawLine();

  // --- SKILLS ---
  const skillDefaults = [
    { title: "Product", skills_ru: ["Стратегия", "Discovery"], skills_en: ["Strategy", "Discovery"] },
  ];
  const groups = content.skills?.groups || skillDefaults;

  addPageIfNeeded(15);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(0);
  doc.text(t("НАВЫКИ", "SKILLS"), margin, y);
  y += 7;

  doc.setFontSize(10);
  groups.forEach((g: any) => {
    addPageIfNeeded(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text(g.title, margin + 2, y);
    y += 5;

    const skills = (t(g.skills_ru, g.skills_en) as any) as string[];
    if (skills) {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      doc.text(skills.join("  •  "), margin + 2, y);
      y += 6;
    }
  });

  drawLine();

  // --- INDUSTRIES ---
  const indDefaults = [
    { label_ru: "Энергетика", label_en: "Energy" },
    { label_ru: "Инфраструктура", label_en: "Infrastructure" },
  ];
  const industries = content.industries?.items || indDefaults;

  addPageIfNeeded(10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(0);
  doc.text(t("ИНДУСТРИИ", "INDUSTRIES"), margin, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(industries.map((ind: any) => t(ind.label_ru, ind.label_en)).join("  •  "), margin + 2, y);
  y += 10;

  // --- FOOTER ---
  doc.setFontSize(8);
  doc.setTextColor(160, 160, 160);
  doc.text(`© ${new Date().getFullYear()} ${name}`, pageWidth / 2, 290, { align: "center" });

  doc.save(`${name.replace(/\s+/g, "_")}_Resume.pdf`);
};
