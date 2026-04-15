import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface SiteContent {
  [section: string]: any;
}

type Lang = "ru" | "en";

const pick = (lang: Lang, ru: any, en: any) => (lang === "ru" ? ru : en) as string;

/**
 * Builds an off-screen HTML element that looks like a clean resume,
 * renders it via html2canvas, and saves as PDF.
 */
export const generateResumePDF = async (content: SiteContent, lang: Lang) => {
  const t = (ru: string, en: string) => pick(lang, ru, en);

  const hero = content.hero || {};
  const name = hero.name || "Vasiliy Kolesnikov";
  const titleLine1 = hero.title_line1 || "Industrial AI";
  const titleLine2 = hero.title_line2 || "Product Leader";

  // Build HTML string
  const sections: string[] = [];

  // Header
  sections.push(`
    <div style="text-align:center;margin-bottom:20px">
      <div style="font-size:28px;font-weight:700;margin-bottom:6px">${name}</div>
      <div style="font-size:16px;color:#555;margin-bottom:4px">${titleLine1} ${titleLine2}</div>
      <div style="font-size:12px;color:#888">${t(hero.subtitle_ru || "", hero.subtitle_en || "")}</div>
      <div style="font-size:11px;color:#999;margin-top:2px">${t(hero.description_ru || "", hero.description_en || "")}</div>
    </div>
  `);

  // Contact
  const contact = content.contact || {};
  const parts: string[] = [];
  if (contact.email) parts.push(contact.email);
  if (contact.phone_display) parts.push(contact.phone_display);
  if (contact.linkedin_url) parts.push(contact.linkedin_url);
  if (parts.length) {
    sections.push(`<div style="text-align:center;font-size:10px;color:#777;margin-bottom:16px">${parts.join("  |  ")}</div>`);
  }

  sections.push('<hr style="border:none;border-top:1px solid #ddd;margin:12px 0">');

  // Impact
  const metrics = content.impact?.metrics || [];
  if (metrics.length) {
    sections.push(sectionTitle(t("РЕЗУЛЬТАТЫ", "KEY IMPACT")));
    metrics.forEach((m: any) => {
      sections.push(`<div style="font-size:12px;margin-bottom:4px"><strong>${m.value}</strong> — ${t(m.label_ru, m.label_en)}</div>`);
    });
    sections.push('<hr style="border:none;border-top:1px solid #ddd;margin:12px 0">');
  }

  // Experience
  const timeline = content.experience?.timeline || [];
  if (timeline.length) {
    sections.push(sectionTitle(t("ОПЫТ РАБОТЫ", "EXPERIENCE")));
    timeline.forEach((item: any) => {
      const companyName = item.company_ru ? t(item.company_ru, item.company_en || item.company) : item.company;
      sections.push(`
        <div style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;align-items:baseline">
            <strong style="font-size:13px">${companyName}</strong>
            <span style="font-size:10px;color:#999">${t(item.period_ru, item.period_en)}</span>
          </div>
          <div style="font-size:11px;color:#666;margin-bottom:3px">${t(item.role_ru, item.role_en)}</div>
      `);
      const bullets: string[] | undefined = pick(lang, item.items_ru, item.items_en) as any;
      if (bullets) {
        bullets.forEach((b: string) => {
          sections.push(`<div style="font-size:10px;color:#444;padding-left:10px;margin-bottom:2px">• ${b}</div>`);
        });
      }
      sections.push('</div>');
    });
    sections.push('<hr style="border:none;border-top:1px solid #ddd;margin:12px 0">');
  }

  // AI
  const aiItems = content.ai?.items || [];
  if (aiItems.length) {
    sections.push(sectionTitle("AI EXPERIENCE"));
    aiItems.forEach((item: any) => {
      sections.push(`<div style="margin-bottom:6px"><strong style="font-size:12px">${t(item.title_ru, item.title_en)}</strong><div style="font-size:10px;color:#666">${t(item.desc_ru, item.desc_en)}</div></div>`);
    });
    sections.push('<hr style="border:none;border-top:1px solid #ddd;margin:12px 0">');
  }

  // Skills
  const groups = content.skills?.groups || [];
  if (groups.length) {
    sections.push(sectionTitle(t("НАВЫКИ", "SKILLS")));
    groups.forEach((g: any) => {
      const skills: string[] | undefined = pick(lang, g.skills_ru, g.skills_en) as any;
      sections.push(`<div style="margin-bottom:5px"><strong style="font-size:12px">${g.title}</strong><div style="font-size:10px;color:#666">${skills ? skills.join("  •  ") : ""}</div></div>`);
    });
    sections.push('<hr style="border:none;border-top:1px solid #ddd;margin:12px 0">');
  }

  // Industries
  const industries = content.industries?.items || [];
  if (industries.length) {
    sections.push(sectionTitle(t("ИНДУСТРИИ", "INDUSTRIES")));
    sections.push(`<div style="font-size:11px;color:#555">${industries.map((ind: any) => t(ind.label_ru, ind.label_en)).join("  •  ")}</div>`);
  }

  // Footer
  sections.push(`<div style="text-align:center;font-size:9px;color:#bbb;margin-top:20px">© ${new Date().getFullYear()} ${name}</div>`);

  // Create off-screen container
  const container = document.createElement("div");
  container.style.cssText = "position:fixed;left:-9999px;top:0;width:794px;padding:40px 50px;background:#fff;font-family:'Inter','Segoe UI',system-ui,sans-serif;color:#1a1a1a;line-height:1.5";
  container.innerHTML = sections.join("");
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, { scale: 2, useCORS: true, logging: false });
    const imgWidth = 210; // A4 mm
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${name.replace(/\s+/g, "_")}_Resume.pdf`);
  } finally {
    document.body.removeChild(container);
  }
};

function sectionTitle(text: string) {
  return `<div style="font-size:14px;font-weight:700;margin:8px 0 6px;text-transform:uppercase;letter-spacing:1px">${text}</div>`;
}
