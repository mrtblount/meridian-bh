"use client";

import {
  BarChart3,
  PenLine,
  Users,
  Calendar,
  TrendingUp,
  Mail,
  Heart,
} from "lucide-react";

type Tab = "briefing" | "linkedin" | "pipeline";

const navItems = [
  { id: "briefing" as Tab, label: "Business Intelligence", icon: BarChart3 },
  { id: "linkedin" as Tab, label: "Content Studio", icon: PenLine },
  { id: "pipeline" as Tab, label: "Referral Pipeline", icon: Users },
];

const quickLinks = [
  { label: "Schedule", icon: Calendar },
  { label: "Analytics", icon: TrendingUp },
  { label: "Email Logs", icon: Mail },
];

export default function Sidebar({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[240px] bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-display text-lg font-medium text-sidebar-foreground tracking-tight">
              Meridian BH
            </p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Automation Suite
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Dashboard
        </p>
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 h-11 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Quick Actions
          </p>
          <div className="space-y-0.5">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <div
                  key={link.label}
                  className="flex items-center gap-3 px-3 h-10 text-sm text-muted-foreground"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="uppercase tracking-wide">{link.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            TB
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              Tony Blount
            </p>
            <p className="text-xs text-muted-foreground truncate">
              owner@meridianbh.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
