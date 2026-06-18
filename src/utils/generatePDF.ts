import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface SiteContent {
  [section: string]: any;
}

type Lang = "ru" | "en";

const pick = (lang: Lang, ru: any, en: any) => (lang === "ru" ? ru : en) as string;

/**
 * Builds an off-screen HTML resume, then renders block-by-block into a PDF
 * so that elements are never cut in half across page boundaries.
 */
export const generateResumePDF = async (content: SiteContent, lang: Lang) => {
  const t = (ru: string, en: string) => pick(lang, ru, en);

  const hero = content.hero || {};
  const name = hero.name || "Vasiliy Kolesnikov";
  const titleLine1 = hero.title_line1 || "Industrial AI";
  const titleLine2 = hero.title_line2 || "Product Leader";

  // Each block is rendered separately so we can paginate without cutting it.
  const blocks: string[] = [];
  const dash = (s: string) => String(s ?? "").replace(/[—–−]/g, "-");

  // Header
  blocks.push(`
    <div data-pdf-block style="text-align:center;margin-bottom:20px">
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
    blocks.push(`<div data-pdf-block style="text-align:center;font-size:10px;color:#777;margin-bottom:16px;overflow-wrap:anywhere;word-break:normal">${parts.join("  |  ")}</div>`);
  }

  blocks.push(divider());

  // Impact
  const metrics = content.impact?.metrics || [];
  if (metrics.length) {
    const inner = metrics
      .map((m: any) => `<div style="font-size:12px;margin-bottom:4px"><strong>${m.value}</strong> — ${t(m.label_ru, m.label_en)}</div>`)
      .join("");
    blocks.push(wrapBlock(sectionTitle(t("РЕЗУЛЬТАТЫ", "KEY IMPACT")) + inner));
    blocks.push(divider());
  }

  // Experience — each entry is its own block so individual jobs stay intact
  const timeline = content.experience?.timeline || [];
  if (timeline.length) {
    blocks.push(wrapBlock(sectionTitle(t("ОПЫТ РАБОТЫ", "EXPERIENCE"))));
    timeline.forEach((item: any) => {
      const companyName = item.company_ru ? t(item.company_ru, item.company_en || item.company) : item.company;
      const bullets: string[] | undefined = pick(lang, item.items_ru, item.items_en) as any;
      const bulletsHtml = bullets
        ? bullets
            .map((b: string) => {
              if (String(b).trim().length === 0) {
                return `<div style="font-size:10px;line-height:1.55;height:14px">&nbsp;</div>`;
              }
              return `<div style="display:grid;grid-template-columns:10px minmax(0,1fr);gap:0;font-size:10px;line-height:1.55;color:#444;margin-bottom:3px;overflow-wrap:anywhere"><span>•</span><span>${b}</span></div>`;
            })
            .join("")
        : "";
      blocks.push(wrapBlock(`
        <div style="margin-bottom:10px;word-wrap:break-word;overflow-wrap:anywhere">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:8px">
            <strong style="font-size:13px;flex:1 1 auto;min-width:0">${companyName}</strong>
            <span style="font-size:10px;color:#999;flex-shrink:0">${t(item.period_ru, item.period_en)}</span>
          </div>
          <div style="font-size:11px;color:#666;margin-bottom:3px">${t(item.role_ru, item.role_en)}</div>
          ${bulletsHtml}
        </div>
      `));
    });
    blocks.push(divider());
  }

  // AI
  const aiItems = content.ai?.items || [];
  if (aiItems.length) {
    blocks.push(wrapBlock(sectionTitle("AI EXPERIENCE")));
    aiItems.forEach((item: any) => {
      blocks.push(wrapBlock(`<div style="margin-bottom:6px"><strong style="font-size:12px">${t(item.title_ru, item.title_en)}</strong><div style="font-size:10px;color:#666">${t(item.desc_ru, item.desc_en)}</div></div>`));
    });
    blocks.push(divider());
  }

  // Skills
  const groups = content.skills?.groups || [];
  if (groups.length) {
    blocks.push(wrapBlock(sectionTitle(t("НАВЫКИ", "SKILLS"))));
    groups.forEach((g: any) => {
      const skills: string[] | undefined = pick(lang, g.skills_ru, g.skills_en) as any;
       blocks.push(wrapBlock(`<div style="margin-bottom:5px;overflow-wrap:anywhere"><strong style="font-size:12px">${g.title}</strong><div style="font-size:10px;line-height:1.55;color:#666">${skills ? skills.join("  •  ") : ""}</div></div>`));
    });
    blocks.push(divider());
  }

  // Education
  const eduItems = content.education?.items || [];
  const courses = content.education?.courses || [];
  if (eduItems.length || courses.length) {
    blocks.push(wrapBlock(sectionTitle(t("ОБРАЗОВАНИЕ", "EDUCATION"))));
    eduItems.forEach((item: any) => {
      blocks.push(wrapBlock(`
        <div style="margin-bottom:8px;word-wrap:break-word;overflow-wrap:anywhere">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:8px">
            <strong style="font-size:12px;flex:1 1 auto;min-width:0">${t(item.institution_ru, item.institution_en)}</strong>
            <span style="font-size:10px;color:#999;flex-shrink:0">${t(item.period_ru || "", item.period_en || "")}</span>
          </div>
          <div style="font-size:11px;color:#666">${t(item.degree_ru || "", item.degree_en || "")}</div>
          ${item.description_ru || item.description_en ? `<div style="font-size:10px;color:#777;margin-top:2px">${t(item.description_ru || "", item.description_en || "")}</div>` : ""}
        </div>
      `));
    });
    if (courses.length) {
      blocks.push(wrapBlock(`<div style="font-size:11px;font-weight:600;margin:6px 0 4px">${t("Курсы и сертификаты", "Courses & Certifications")}</div>`));
      courses.forEach((c: any) => {
        blocks.push(wrapBlock(`<div style="display:grid;grid-template-columns:10px minmax(0,1fr);font-size:10px;line-height:1.55;color:#555;margin-bottom:3px;overflow-wrap:anywhere"><span>•</span><span>${t(c.title_ru, c.title_en)}${c.provider ? ` — ${c.provider}` : ""}${c.year ? ` (${c.year})` : ""}</span></div>`));
      });
    }
    blocks.push(divider());
  }

  // Industries
  const industries = content.industries?.items || [];
  if (industries.length) {
    blocks.push(wrapBlock(
      sectionTitle(t("ИНДУСТРИИ", "INDUSTRIES")) +
      `<div style="font-size:11px;line-height:1.55;color:#555;overflow-wrap:anywhere">${industries.map((ind: any) => t(ind.label_ru, ind.label_en)).join("  •  ")}</div>`
    ));
  }

  // Footer
  blocks.push(`<div data-pdf-block style="text-align:center;font-size:9px;color:#bbb;margin-top:20px">© ${new Date().getFullYear()} ${name}</div>`);

  // Create off-screen container that holds all blocks
  const CONTENT_WIDTH_PX = 794; // ~A4 width at 96dpi
  const PADDING_X = 50;
  const PADDING_Y = 40;
  const container = document.createElement("div");
  container.style.cssText = `position:fixed;left:-9999px;top:0;width:${CONTENT_WIDTH_PX}px;padding:${PADDING_Y}px ${PADDING_X}px;background:#fff;font-family:'Inter','Segoe UI',system-ui,sans-serif;color:#1a1a1a;line-height:1.5;word-wrap:break-word;overflow-wrap:anywhere;box-sizing:border-box`;
  container.innerHTML = dash(blocks.join(""));
  const style = document.createElement("style");
  style.textContent = `
    [data-pdf-block], [data-pdf-block] * {
      box-sizing: border-box;
      max-width: 100%;
      white-space: normal;
    }

    [data-pdf-block] {
      display: flow-root;
      width: 100%;
      overflow: visible;
      padding: 2px 0 4px;
    }
  `;
  container.prepend(style);
  document.body.appendChild(container);

  try {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidthMm = 210;
    const pageHeightMm = 297;
    const marginMm = 12;
    const usableWidthMm = pageWidthMm - marginMm * 2;
    const usableHeightMm = pageHeightMm - marginMm * 2;

    // Render each block to its own canvas, then place into the PDF
    // adding a new page whenever the block doesn't fit on the current one.
    const blockEls = Array.from(container.querySelectorAll<HTMLElement>("[data-pdf-block]"));
    let cursorY = marginMm;

    for (const el of blockEls) {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: el.scrollWidth,
        height: el.scrollHeight + 4,
        windowWidth: container.scrollWidth,
      });
      const imgWidth = usableWidthMm;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("image/jpeg", 0.9);

      if (imgHeight > usableHeightMm) {
        // Block taller than a full page: slice it across pages.
        let remaining = imgHeight;
        let sourceY = 0;
        const pxPerMm = canvas.width / imgWidth;
        // First, move to a new page if current page already has content.
        if (cursorY > marginMm) {
          pdf.addPage();
          cursorY = marginMm;
        }
        while (remaining > 0) {
          const sliceHeightMm = Math.min(usableHeightMm, remaining);
          const sliceHeightPx = sliceHeightMm * pxPerMm;
          const sliceCanvas = document.createElement("canvas");
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = sliceHeightPx;
          const ctx = sliceCanvas.getContext("2d")!;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
          ctx.drawImage(canvas, 0, sourceY, canvas.width, sliceHeightPx, 0, 0, canvas.width, sliceHeightPx);
          pdf.addImage(sliceCanvas.toDataURL("image/jpeg", 0.9), "JPEG", marginMm, marginMm, imgWidth, sliceHeightMm);
          sourceY += sliceHeightPx;
          remaining -= sliceHeightMm;
          if (remaining > 0) {
            pdf.addPage();
            cursorY = marginMm;
          } else {
            cursorY = marginMm + sliceHeightMm;
          }
        }
        continue;
      }

      if (cursorY + imgHeight > marginMm + usableHeightMm) {
        pdf.addPage();
        cursorY = marginMm;
      }
      pdf.addImage(imgData, "JPEG", marginMm, cursorY, imgWidth, imgHeight);
      cursorY += imgHeight;
    }

    pdf.save(`${name.replace(/\s+/g, "_")}_Resume.pdf`);
  } finally {
    document.body.removeChild(container);
  }
};

function sectionTitle(text: string) {
  return `<div style="font-size:14px;font-weight:700;margin:8px 0 6px;text-transform:uppercase;letter-spacing:1px">${text}</div>`;
}

function wrapBlock(html: string) {
  return `<div data-pdf-block>${html}</div>`;
}

function divider() {
  return `<div data-pdf-block><hr style="border:none;border-top:1px solid #ddd;margin:12px 0"></div>`;
}
