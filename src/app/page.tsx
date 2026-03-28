"use client";

import { useState } from "react";
import DashboardHeader from "./components/dashboard-header";
import BriefingSection from "./components/briefing-section";
import LinkedinSection from "./components/linkedin-section";
import PipelineSection from "./components/pipeline-section";
import Sidebar from "./components/sidebar";

type Tab = "briefing" | "linkedin" | "pipeline";

const tabs: { id: Tab; label: string }[] = [
  { id: "briefing", label: "Overview" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "pipeline", label: "Pipeline" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("briefing");

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 ml-[260px]">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-zinc-200/60">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
                {activeTab === "briefing" && "Business Intelligence"}
                {activeTab === "linkedin" && "Content Studio"}
                {activeTab === "pipeline" && "Referral Pipeline"}
              </h1>
              <div className="flex gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-1.5 text-sm font-medium rounded-md transition-all ${
                      activeTab === tab.id
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors">
                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>
              <button className="w-9 h-9 rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors">
                <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <div className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-white text-xs font-semibold">
                MB
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <DashboardHeader />

          <div className="animate-fade-in mt-8" key={activeTab}>
            {activeTab === "briefing" && <BriefingSection />}
            {activeTab === "linkedin" && <LinkedinSection />}
            {activeTab === "pipeline" && <PipelineSection />}
          </div>
        </div>
      </main>
    </div>
  );
}
