import jsPDF from "jspdf";

interface SiteContent {
  [section: string]: any;
}

type Lang = "ru" | "en";

const pick = (lang: Lang, ru: any, en: any) => (lang === "ru" ? ru : en);

export const generateResumePDF = (content: SiteContent, lang: Lang) => {
  const t = (ru: string, en: string) => pick(lang, ru, en) as string;
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

  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(t(hero.subtitle_ru || "Создаю AI-driven продукты", hero.subtitle_en || "Building AI-driven products"), pageWidth / 2, y, { align: "center" });
  y += 5;
  doc.text(t(hero.description_ru || "", hero.description_en || ""), pageWidth / 2, y, { align: "center" });
  y += 8;

  // --- CONTACT ---
  const contact = content.contact || {};
  const parts: string[] = [];
  if (contact.email) parts.push(contact.email);
  if (contact.phone_display) parts.push(contact.phone_display);
  if (contact.linkedin_url) parts.push(contact.linkedin_url);
  if (parts.length) {
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(parts.join("  |  "), pageWidth / 2, y, { align: "center" });
    y += 8;
  }

  drawLine();

  // --- IMPACT ---
  const metrics = content.impact?.metrics || [];
  if (metrics.length) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(0);
    doc.text(t("РЕЗУЛЬТАТЫ", "KEY IMPACT"), margin, y);
    y += 7;

    doc.setFontSize(10);
    metrics.forEach((m: any) => {
      addPageIfNeeded(6);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(50, 50, 50);
      const valText = `${m.value}`;
      doc.text(valText, margin + 2, y);
      doc.setFont("helvetica", "normal");
      doc.text(` — ${t(m.label_ru, m.label_en)}`, margin + 2 + doc.getTextWidth(valText + " "), y);
      y += 6;
    });
    y += 4;
    drawLine();
  }

  // --- EXPERIENCE ---
  const timeline = content.experience?.timeline || [];
  if (timeline.length) {
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

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text(t(item.period_ru, item.period_en), pageWidth - margin, y, { align: "right" });
      y += 5;

      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(t(item.role_ru, item.role_en), margin + 2, y);
      y += 6;

      const bullets: string[] | undefined = pick(lang, item.items_ru, item.items_en);
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
  }

  // --- AI ---
  const aiItems = content.ai?.items || [];
  if (aiItems.length) {
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
  }

  // --- SKILLS ---
  const groups = content.skills?.groups || [];
  if (groups.length) {
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
      const skills: string[] | undefined = pick(lang, g.skills_ru, g.skills_en);
      if (skills) {
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80, 80, 80);
        doc.text(skills.join("  •  "), margin + 2, y);
        y += 6;
      }
    });
    drawLine();
  }

  // --- INDUSTRIES ---
  const industries = content.industries?.items || [];
  if (industries.length) {
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
  }

  // --- FOOTER ---
  doc.setFontSize(8);
  doc.setTextColor(160, 160, 160);
  doc.text(`© ${new Date().getFullYear()} ${name}`, pageWidth / 2, 290, { align: "center" });

  doc.save(`${name.replace(/\s+/g, "_")}_Resume.pdf`);
};
