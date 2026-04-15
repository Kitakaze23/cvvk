import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LogOut, Save, Plus, Trash2, Upload, Flame, Building2, Brain, Leaf, Zap, Globe, Shield, Cpu, Rocket, Heart, Star, Target, TrendingUp, Database, Cloud, Factory, Gauge, BarChart3, Network } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

const AVAILABLE_ICONS = [
  { name: "Flame", icon: Flame },
  { name: "Building2", icon: Building2 },
  { name: "Brain", icon: Brain },
  { name: "Leaf", icon: Leaf },
  { name: "Zap", icon: Zap },
  { name: "Globe", icon: Globe },
  { name: "Shield", icon: Shield },
  { name: "Cpu", icon: Cpu },
  { name: "Rocket", icon: Rocket },
  { name: "Heart", icon: Heart },
  { name: "Star", icon: Star },
  { name: "Target", icon: Target },
  { name: "TrendingUp", icon: TrendingUp },
  { name: "Database", icon: Database },
  { name: "Cloud", icon: Cloud },
  { name: "Factory", icon: Factory },
  { name: "Gauge", icon: Gauge },
  { name: "BarChart3", icon: BarChart3 },
  { name: "Network", icon: Network },
];

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const { content, updateSection, refetch } = useSiteContent();
  const [editData, setEditData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(content).length > 0) {
      setEditData(JSON.parse(JSON.stringify(content)));
    }
  }, [content]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Добро пожаловать!");
    }
    setAuthLoading(false);
  };

  const handleSignUp = async () => {
    setAuthLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Аккаунт создан! Проверьте почту для подтверждения.");
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const saveSection = async (section: string) => {
    setSaving(section);
    await updateSection(section, editData[section]);
    toast.success(`Секция "${section}" сохранена`);
    setSaving(null);
  };

  const updateField = (section: string, path: string, value: any) => {
    setEditData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[section]) copy[section] = {};
      const keys = path.split(".");
      let obj = copy[section];
      for (let i = 0; i < keys.length - 1; i++) {
        const key = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
        if (!obj[key]) obj[key] = {};
        obj = obj[key];
      }
      const lastKey = isNaN(Number(keys[keys.length - 1])) ? keys[keys.length - 1] : Number(keys[keys.length - 1]);
      obj[lastKey] = value;
      return copy;
    });
  };

  const addArrayItem = (section: string, path: string, template: any) => {
    setEditData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = copy[section];
      for (const key of keys) {
        obj = obj[isNaN(Number(key)) ? key : Number(key)];
      }
      obj.push(template);
      return copy;
    });
  };

  const removeArrayItem = (section: string, path: string, index: number) => {
    setEditData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = copy[section];
      for (const key of keys) {
        obj = obj[isNaN(Number(key)) ? key : Number(key)];
      }
      obj.splice(index, 1);
      return copy;
    });
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `avatar-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("avatars").upload(fileName, file, { upsert: true });
    if (error) {
      toast.error("Ошибка загрузки: " + error.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
    updateField("hero", "avatar_url", urlData.publicUrl);
    toast.success("Фото загружено! Не забудьте сохранить секцию Hero.");
    setUploading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="glass rounded-xl p-8 w-full max-w-sm">
          <h1 className="font-display text-2xl font-bold text-center mb-6">
            <span className="text-gradient">Admin</span>
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={authLoading}>
              {authLoading ? "..." : "Войти"}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={handleSignUp} disabled={authLoading}>
              Создать аккаунт
            </Button>
          </form>
          <div className="mt-4 text-center">
            <a href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← На сайт
            </a>
          </div>
        </div>
      </div>
    );
  }

  const hero = editData.hero || {};
  const contactData = editData.contact || {};
  const visionData = editData.vision || {};
  const impactData = editData.impact || {};
  const aiData = editData.ai || {};
  const experienceData = editData.experience || {};
  const skillsData = editData.skills || {};
  const industriesData = editData.industries || {};

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass border-b border-border/30 px-6 py-3 flex items-center justify-between">
        <h1 className="font-display font-bold text-lg">
          <span className="text-gradient">Admin Panel</span>
        </h1>
        <div className="flex items-center gap-3">
          <a href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            На сайт
          </a>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* HERO */}
        <SectionEditor title="🏠 Hero" section="hero" saving={saving} onSave={saveSection}>
          {/* Avatar upload */}
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Фотография</label>
            <div className="flex items-center gap-4">
              {hero.avatar_url ? (
                <img src={hero.avatar_url} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-primary/30" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center border-2 border-border">
                  <span className="text-muted-foreground text-xs">Нет фото</span>
                </div>
              )}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  <Upload className="w-3 h-3 mr-1" />
                  {uploading ? "Загрузка..." : "Загрузить фото"}
                </Button>
              </div>
            </div>
          </div>
          <Field label="Имя" value={hero.name} onChange={(v) => updateField("hero", "name", v)} />
          <Field label="Заголовок (строка 1)" value={hero.title_line1} onChange={(v) => updateField("hero", "title_line1", v)} />
          <Field label="Заголовок (строка 2)" value={hero.title_line2} onChange={(v) => updateField("hero", "title_line2", v)} />
          <Field label="Подзаголовок (RU)" value={hero.subtitle_ru} onChange={(v) => updateField("hero", "subtitle_ru", v)} />
          <Field label="Подзаголовок (EN)" value={hero.subtitle_en} onChange={(v) => updateField("hero", "subtitle_en", v)} />
          <Field label="Описание (RU)" value={hero.description_ru} onChange={(v) => updateField("hero", "description_ru", v)} />
          <Field label="Описание (EN)" value={hero.description_en} onChange={(v) => updateField("hero", "description_en", v)} />
        </SectionEditor>

        {/* IMPACT */}
        <SectionEditor title="📊 Impact" section="impact" saving={saving} onSave={saveSection}>
          {impactData.metrics?.map((m: any, i: number) => (
            <div key={i} className="glass rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Метрика {i + 1}</span>
                <Button variant="ghost" size="sm" onClick={() => removeArrayItem("impact", "metrics", i)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <Field label="Значение" value={m.value} onChange={(v) => updateField("impact", `metrics.${i}.value`, v)} />
              <Field label="Метка (RU)" value={m.label_ru} onChange={(v) => updateField("impact", `metrics.${i}.label_ru`, v)} />
              <Field label="Метка (EN)" value={m.label_en} onChange={(v) => updateField("impact", `metrics.${i}.label_en`, v)} />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addArrayItem("impact", "metrics", { value: "", label_ru: "", label_en: "" })}>
            <Plus className="w-3 h-3 mr-1" /> Добавить метрику
          </Button>
        </SectionEditor>

        {/* AI */}
        <SectionEditor title="🤖 AI Experience" section="ai" saving={saving} onSave={saveSection}>
          {aiData.items?.map((item: any, i: number) => (
            <div key={i} className="glass rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">AI блок {i + 1}</span>
                <Button variant="ghost" size="sm" onClick={() => removeArrayItem("ai", "items", i)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <Field label="Заголовок (RU)" value={item.title_ru} onChange={(v) => updateField("ai", `items.${i}.title_ru`, v)} />
              <Field label="Заголовок (EN)" value={item.title_en} onChange={(v) => updateField("ai", `items.${i}.title_en`, v)} />
              <Field label="Описание (RU)" value={item.desc_ru} onChange={(v) => updateField("ai", `items.${i}.desc_ru`, v)} />
              <Field label="Описание (EN)" value={item.desc_en} onChange={(v) => updateField("ai", `items.${i}.desc_en`, v)} />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addArrayItem("ai", "items", { title_ru: "", title_en: "", desc_ru: "", desc_en: "" })}>
            <Plus className="w-3 h-3 mr-1" /> Добавить блок
          </Button>
        </SectionEditor>

        {/* EXPERIENCE */}
        <SectionEditor title="💼 Experience" section="experience" saving={saving} onSave={saveSection}>
          {experienceData.timeline?.map((t: any, i: number) => (
            <div key={i} className="glass rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">{t.company || t.company_ru || `Позиция ${i + 1}`}</span>
                <Button variant="ghost" size="sm" onClick={() => removeArrayItem("experience", "timeline", i)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <Field label="Компания" value={t.company || ""} onChange={(v) => updateField("experience", `timeline.${i}.company`, v)} />
              <Field label="Компания (RU)" value={t.company_ru || ""} onChange={(v) => updateField("experience", `timeline.${i}.company_ru`, v)} />
              <Field label="Компания (EN)" value={t.company_en || ""} onChange={(v) => updateField("experience", `timeline.${i}.company_en`, v)} />
              <Field label="Роль (RU)" value={t.role_ru} onChange={(v) => updateField("experience", `timeline.${i}.role_ru`, v)} />
              <Field label="Роль (EN)" value={t.role_en} onChange={(v) => updateField("experience", `timeline.${i}.role_en`, v)} />
              <Field label="Период (RU)" value={t.period_ru} onChange={(v) => updateField("experience", `timeline.${i}.period_ru`, v)} />
              <Field label="Период (EN)" value={t.period_en} onChange={(v) => updateField("experience", `timeline.${i}.period_en`, v)} />
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Пункты (RU) — по одному на строку</label>
                <Textarea
                  value={(t.items_ru || []).join("\n")}
                  onChange={(e) => updateField("experience", `timeline.${i}.items_ru`, e.target.value.split("\n"))}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Пункты (EN) — по одному на строку</label>
                <Textarea
                  value={(t.items_en || []).join("\n")}
                  onChange={(e) => updateField("experience", `timeline.${i}.items_en`, e.target.value.split("\n"))}
                  rows={3}
                />
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addArrayItem("experience", "timeline", { company: "", role_ru: "", role_en: "", period_ru: "", period_en: "", items_ru: [], items_en: [] })}>
            <Plus className="w-3 h-3 mr-1" /> Добавить позицию
          </Button>
        </SectionEditor>

        {/* SKILLS */}
        <SectionEditor title="🧠 Skills" section="skills" saving={saving} onSave={saveSection}>
          {skillsData.groups?.map((g: any, i: number) => (
            <div key={i} className="glass rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">{g.title}</span>
                <Button variant="ghost" size="sm" onClick={() => removeArrayItem("skills", "groups", i)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <Field label="Название группы" value={g.title} onChange={(v) => updateField("skills", `groups.${i}.title`, v)} />
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Навыки (RU) — по одному на строку</label>
                <Textarea
                  value={(g.skills_ru || []).join("\n")}
                  onChange={(e) => updateField("skills", `groups.${i}.skills_ru`, e.target.value.split("\n"))}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Навыки (EN) — по одному на строку</label>
                <Textarea
                  value={(g.skills_en || []).join("\n")}
                  onChange={(e) => updateField("skills", `groups.${i}.skills_en`, e.target.value.split("\n"))}
                  rows={3}
                />
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addArrayItem("skills", "groups", { title: "", skills_ru: [], skills_en: [] })}>
            <Plus className="w-3 h-3 mr-1" /> Добавить группу
          </Button>
        </SectionEditor>

        {/* INDUSTRIES */}
        <SectionEditor title="🌍 Industries" section="industries" saving={saving} onSave={saveSection}>
          {industriesData.items?.map((item: any, i: number) => (
            <div key={i} className="glass rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">Индустрия {i + 1}</span>
                <Button variant="ghost" size="sm" onClick={() => removeArrayItem("industries", "items", i)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Иконка</label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_ICONS.map(({ name, icon: Icon }) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => updateField("industries", `items.${i}.icon`, name)}
                      className={`p-2 rounded-lg border transition-all ${
                        item.icon === name
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                      title={name}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
              <Field label="Название (RU)" value={item.label_ru} onChange={(v) => updateField("industries", `items.${i}.label_ru`, v)} />
              <Field label="Название (EN)" value={item.label_en} onChange={(v) => updateField("industries", `items.${i}.label_en`, v)} />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addArrayItem("industries", "items", { label_ru: "", label_en: "", icon: "Flame" })}>
            <Plus className="w-3 h-3 mr-1" /> Добавить индустрию
          </Button>
        </SectionEditor>

        {/* VISION */}
        <SectionEditor title="🚀 Vision" section="vision" saving={saving} onSave={saveSection}>
          <Field label="Заголовок (RU)" value={visionData.title_ru} onChange={(v) => updateField("vision", "title_ru", v)} />
          <Field label="Заголовок (EN)" value={visionData.title_en} onChange={(v) => updateField("vision", "title_en", v)} />
          <Field label="Акцент (gradient)" value={visionData.highlight} onChange={(v) => updateField("vision", "highlight", v)} />
          <FieldTextarea label="Описание (RU)" value={visionData.description_ru} onChange={(v) => updateField("vision", "description_ru", v)} />
          <FieldTextarea label="Описание (EN)" value={visionData.description_en} onChange={(v) => updateField("vision", "description_en", v)} />
        </SectionEditor>

        {/* CONTACT */}
        <SectionEditor title="📬 Contact" section="contact" saving={saving} onSave={saveSection}>
          <Field label="Email" value={contactData.email} onChange={(v) => updateField("contact", "email", v)} />
          <Field label="Телефон (ссылка)" value={contactData.phone} onChange={(v) => updateField("contact", "phone", v)} />
          <Field label="Телефон (отображение)" value={contactData.phone_display} onChange={(v) => updateField("contact", "phone_display", v)} />
          <Field label="URL портфолио" value={contactData.portfolio_url} onChange={(v) => updateField("contact", "portfolio_url", v)} />
          <FieldTextarea label="Описание (RU)" value={contactData.description_ru} onChange={(v) => updateField("contact", "description_ru", v)} />
          <FieldTextarea label="Описание (EN)" value={contactData.description_en} onChange={(v) => updateField("contact", "description_en", v)} />
        </SectionEditor>
      </div>
    </div>
  );
};

const SectionEditor = ({
  title,
  section,
  saving,
  onSave,
  children,
}: {
  title: string;
  section: string;
  saving: string | null;
  onSave: (s: string) => void;
  children: React.ReactNode;
}) => (
  <div className="glass rounded-xl p-6 space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="font-display font-bold text-lg">{title}</h2>
      <Button size="sm" onClick={() => onSave(section)} disabled={saving === section}>
        <Save className="w-3 h-3 mr-1" />
        {saving === section ? "..." : "Сохранить"}
      </Button>
    </div>
    {children}
  </div>
);

const Field = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
    <Input value={value || ""} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const FieldTextarea = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
    <Textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={3} />
  </div>
);

export default Admin;
