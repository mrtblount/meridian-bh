"use client";

import { useState } from "react";
import DashboardHeader from "./components/dashboard-header";
import BriefingSection from "./components/briefing-section";
import LinkedinSection from "./components/linkedin-section";
import PipelineSection from "./components/pipeline-section";

type Tab = "briefing" | "linkedin" | "pipeline";

const tabs: { id: Tab; label: string }[] = [
  { id: "briefing", label: "Intelligence Briefing" },
  { id: "linkedin", label: "LinkedIn Drafts" },
  { id: "pipeline", label: "Referral Pipeline" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("briefing");

  return (
    <main className="max-w-7xl mx-auto px-6 py-6 w-full">
      <DashboardHeader />

      <div className="flex gap-1 bg-white rounded-xl border border-slate-200 p-1 mb-6 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-[#1e3a5f] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-fade-in" key={activeTab}>
        {activeTab === "briefing" && <BriefingSection />}
        {activeTab === "linkedin" && <LinkedinSection />}
        {activeTab === "pipeline" && <PipelineSection />}
      </div>
    </main>
  );
}
