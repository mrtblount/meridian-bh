"use client";

import { useState } from "react";
import DashboardHeader from "./components/dashboard-header";
import BriefingSection from "./components/briefing-section";
import LinkedinSection from "./components/linkedin-section";
import PipelineSection from "./components/pipeline-section";
import Sidebar from "./components/sidebar";

type Tab = "briefing" | "linkedin" | "pipeline";

const tabLabels: Record<Tab, string> = {
  briefing: "Overview",
  linkedin: "LinkedIn",
  pipeline: "Pipeline",
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("briefing");

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 ml-[240px]">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-6">
              <h1 className="font-display text-xl font-medium tracking-tight text-foreground">
                {activeTab === "briefing" && "Business Intelligence"}
                {activeTab === "linkedin" && "Content Studio"}
                {activeTab === "pipeline" && "Referral Pipeline"}
              </h1>
              {/* Tabs */}
              <div className="bg-foreground/5 rounded-lg p-1 flex gap-0.5">
                {(Object.entries(tabLabels) as [Tab, string][]).map(
                  ([id, label]) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`px-3.5 py-1.5 text-sm rounded-md transition-all ${
                        activeTab === id
                          ? "bg-primary text-primary-foreground font-bold uppercase"
                          : "text-foreground/60 font-medium uppercase hover:text-foreground/80"
                      }`}
                    >
                      {label}
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-md bg-pop border border-border text-xs text-muted-foreground font-mono">
                {new Date().toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
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
