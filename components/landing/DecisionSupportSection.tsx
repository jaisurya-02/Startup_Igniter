import { ShieldAlert } from "lucide-react";

export function DecisionSupportSection() {
  return (
    <section className="py-12 px-6 bg-[#121214] border-y border-white/10 font-poppins">
      <div className="max-w-4xl mx-auto bg-[#18181B] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-4 shadow-lg">
        <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] shrink-0 mt-1">
          <ShieldAlert className="w-5 h-5" />
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white font-poppins">
            Human-Centric Decision Support System
          </h3>
          <p className="text-xs text-[#A1A1AA] leading-relaxed">
            Startup Igniter is engineered to perform rigorous research, market analysis, structured organization, and strategic recommendations. Founders retain ultimate responsibility for all strategic, legal, financial, and investment decisions. Always verify legal, patent, and regulatory information with qualified domain experts.
          </p>
        </div>
      </div>
    </section>
  );
}
