import { ICON_MAP, ICON_NAMES } from "@/utils/iconMap";

interface IconPickerProps {
  value: string;
  onChange: (icon: string) => void;
}

const IconPicker = ({ value, onChange }: IconPickerProps) => (
  <div>
    <label className="text-xs text-muted-foreground mb-2 block">Иконка</label>
    <div className="flex flex-wrap gap-2">
      {ICON_NAMES.map((name) => {
        const Icon = ICON_MAP[name];
        return (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            className={`p-2 rounded-lg border transition-all ${
              value === name
                ? "border-primary bg-primary/20 text-primary"
                : "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
            title={name}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  </div>
);

export default IconPicker;
