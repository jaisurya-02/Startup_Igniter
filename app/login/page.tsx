"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { Button } from "@/components/ui/button";
import { Compass, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";

function LoginFormInner() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        email: email.trim(),
        password,
      });

      router.push(redirectUrl);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected login error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#121214] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white font-poppins mb-1">
          Welcome Back
        </h1>
        <p className="text-xs text-[#A1A1AA]">
          Sign in to access your startup workspace
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
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

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#A1A1AA] font-poppins">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-[#FF6B00] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl pl-10 pr-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00] transition-colors font-poppins"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full font-bold gap-2 mt-4"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
          {!isSubmitting && <ArrowRight className="w-4 h-4" />}
        </Button>
      </form>

      <div className="text-center mt-6 pt-4 border-t border-white/10 text-xs text-[#A1A1AA]">
        Don&apos;t have an account yet?{" "}
        <Link href="/register" className="text-[#FF6B00] font-semibold hover:underline">
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
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

      <Suspense fallback={<div className="text-xs text-[#A1A1AA]">Loading login...</div>}>
        <LoginFormInner />
      </Suspense>
    </div>
  );
}
