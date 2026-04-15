import {
  Flame, Building2, Brain, Leaf, Zap, Globe, Shield, Cpu, Rocket, Heart,
  Star, Target, TrendingUp, Database, Cloud, Factory, Gauge, BarChart3,
  Network, Sparkles, GitBranch, Users, Box, Layers, DollarSign
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  Flame, Building2, Brain, Leaf, Zap, Globe, Shield, Cpu, Rocket, Heart,
  Star, Target, TrendingUp, Database, Cloud, Factory, Gauge, BarChart3,
  Network, Sparkles, GitBranch, Users, Box, Layers, DollarSign,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

export const getIcon = (name: string, fallback = "Rocket"): LucideIcon =>
  ICON_MAP[name] || ICON_MAP[fallback] || Rocket;
