import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/resume/Navbar";
import HeroSection from "@/components/resume/HeroSection";
import ImpactSection from "@/components/resume/ImpactSection";
import WhatIBuildSection from "@/components/resume/WhatIBuildSection";
import ExperienceSection from "@/components/resume/ExperienceSection";
import SkillsSection from "@/components/resume/SkillsSection";
import IndustriesSection from "@/components/resume/IndustriesSection";
import ProjectsSection from "@/components/resume/ProjectsSection";
import ContactSection from "@/components/resume/ContactSection";

const Index = () => (
  <LanguageProvider>
    <Navbar />
    <main>
      <HeroSection />
      <ImpactSection />
      <WhatIBuildSection />
      <ExperienceSection />
      <SkillsSection />
      <IndustriesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <footer className="py-8 text-center text-muted-foreground text-xs border-t border-border/30">
      © {new Date().getFullYear()} Vasiliy Kolesnikov. All rights reserved.
    </footer>
  </LanguageProvider>
);

export default Index;
