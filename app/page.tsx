import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { JourneySection } from "@/components/landing/JourneySection";
import { CapabilitiesSection } from "@/components/landing/CapabilitiesSection";
import { AgentSection } from "@/components/landing/AgentSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { StartupContextSection } from "@/components/landing/StartupContextSection";
import { DecisionSupportSection } from "@/components/landing/DecisionSupportSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] font-poppins flex flex-col">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <JourneySection />
        <CapabilitiesSection />
        <AgentSection />
        <HowItWorksSection />
        <StartupContextSection />
        <DecisionSupportSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
