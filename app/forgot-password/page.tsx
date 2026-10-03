"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { Button } from "@/components/ui/button";
import { Compass, Mail, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      await forgotPassword(email.trim());
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5] font-poppins flex flex-col justify-center items-center p-6 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#FF6B00]/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Header Brand */}
      <Link href="/" className="flex items-center gap-3 mb-8 group">
        <div className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#FF6B00]/40 flex items-center justify-center text-[#FF6B00] shadow-md group-hover:bg-[#FF6B00] group-hover:text-white transition-all">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <span className="text-lg font-extrabold tracking-wider font-poppins text-white block">
            STARTUP IGNITER
          </span>
          <span className="text-[10px] font-mono text-[#FF6B00] uppercase tracking-widest block">
            Venture Operating System
          </span>
        </div>
      </Link>

      <div className="w-full max-w-md bg-[#121214] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white font-poppins mb-1">
            Reset Password
          </h1>
          <p className="text-xs text-[#A1A1AA]">
            Enter your email to receive password reset instructions
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="space-y-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white font-poppins">
                Reset Link Sent
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                If an account exists for <span className="text-white font-semibold">{email}</span>, a password reset link has been dispatched. Please check your inbox.
              </p>
            </div>
            <Link href="/login" className="block">
              <Button variant="secondary" className="w-full gap-2 text-xs">
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5 font-poppins">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="you@startup.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl pl-10 pr-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00] transition-colors font-poppins"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full font-bold mt-2"
            >
              {isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
            </Button>

            <div className="text-center pt-2">
              <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-white transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
