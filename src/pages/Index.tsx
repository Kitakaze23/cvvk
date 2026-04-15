import { LanguageProvider } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import Navbar from "@/components/resume/Navbar";
import HeroSection from "@/components/resume/HeroSection";
import ImpactSection from "@/components/resume/ImpactSection";
import WhatIBuildSection from "@/components/resume/WhatIBuildSection";
import AISection from "@/components/resume/AISection";
import ExperienceSection from "@/components/resume/ExperienceSection";
import SkillsSection from "@/components/resume/SkillsSection";
import IndustriesSection from "@/components/resume/IndustriesSection";
import ProjectsSection from "@/components/resume/ProjectsSection";
import ContactSection from "@/components/resume/ContactSection";

const SECTIONS = [
  { key: "hero", Component: HeroSection },
  { key: "impact", Component: ImpactSection },
  { key: "what_i_build", Component: WhatIBuildSection },
  { key: "ai", Component: AISection },
  { key: "experience", Component: ExperienceSection },
  { key: "skills", Component: SkillsSection },
  { key: "industries", Component: IndustriesSection },
  { key: "projects", Component: ProjectsSection },
  { key: "contact", Component: ContactSection },
] as const;

const PageContent = () => {
  const { content } = useSiteContent();
  const visibility = content.section_visibility || {};

  return (
    <>
      <Navbar />
      <main>
        {SECTIONS.map(({ key, Component }) => {
          if (visibility[key] === false) return null;
          return <Component key={key} />;
        })}
      </main>
      <footer className="py-8 text-center text-muted-foreground text-xs border-t border-border/30">
        © {new Date().getFullYear()} Vasiliy Kolesnikov. All rights reserved.
      </footer>
    </>
  );
};

const Index = () => (
  <LanguageProvider>
    <PageContent />
  </LanguageProvider>
);

export default Index;
