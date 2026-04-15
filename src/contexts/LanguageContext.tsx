import React, { createContext, useContext, useState } from "react";

type Lang = "ru" | "en";

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (ru: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "ru",
  toggle: () => {},
  t: (ru) => ru,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("ru");
  const toggle = () => setLang((l) => (l === "ru" ? "en" : "ru"));
  const t = (ru: string, en: string) => (lang === "ru" ? ru : en);

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
