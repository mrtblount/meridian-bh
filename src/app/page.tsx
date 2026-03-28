"use client";

import { useState } from "react";
import DashboardHeader from "./components/dashboard-header";
import BriefingSection from "./components/briefing-section";
import LinkedinSection from "./components/linkedin-section";
import PipelineSection from "./components/pipeline-section";

type Tab = "briefing" | "linkedin" | "pipeline";

const tabs: { id: Tab; label: string }[] = [
  { id: "briefing", label: "Overview" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "pipeline", label: "Pipeline" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("briefing");

  return (
    <main className="max-w-[1400px] mx-auto px-8 py-8 w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Meridian Behavioral Health
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
            {new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
          </div>
        </div>
      </div>

      <div className="flex gap-1 border-b border-zinc-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-zinc-900"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <DashboardHeader />

      <div className="animate-fade-in mt-8" key={activeTab}>
        {activeTab === "briefing" && <BriefingSection />}
        {activeTab === "linkedin" && <LinkedinSection />}
        {activeTab === "pipeline" && <PipelineSection />}
      </div>
    </main>
  );
}
