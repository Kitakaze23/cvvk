import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteContent {
  [section: string]: any;
}

interface SiteContentContextType {
  content: SiteContent;
  loading: boolean;
  updateSection: (section: string, data: any) => Promise<void>;
  refetch: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextType>({
  content: {},
  loading: true,
  updateSection: async () => {},
  refetch: async () => {},
});

export const useSiteContent = () => useContext(SiteContentContext);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>({});
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    const { data } = await supabase.from("site_content").select("*");
    if (data) {
      const map: SiteContent = {};
      data.forEach((row: any) => {
        map[row.section] = row.data;
      });
      setContent(map);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const updateSection = async (section: string, data: any) => {
    const { error } = await supabase
      .from("site_content")
      .upsert({ section, data, updated_at: new Date().toISOString() });
    if (!error) {
      setContent((prev) => ({ ...prev, [section]: data }));
    }
  };

  return (
    <SiteContentContext.Provider value={{ content, loading, updateSection, refetch: fetchContent }}>
      {children}
    </SiteContentContext.Provider>
  );
};
