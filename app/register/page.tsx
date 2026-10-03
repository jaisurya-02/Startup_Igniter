"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import type { UserRole } from "@/lib/auth/auth-types";
import { Button } from "@/components/ui/button";
import { Compass, User, Mail, Lock, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";

const ROLES: Array<{ id: UserRole; label: string; description: string }> = [
  { id: "student", label: "Student", description: "Building a academic or campus startup" },
  { id: "founder", label: "Founder", description: "Launching an independent commercial venture" },
  { id: "researcher", label: "Researcher", description: "Translating lab or IP research into a startup" },
  { id: "innovator", label: "Innovator", description: "Exploring novel tech & market opportunities" },
  { id: "startup_team", label: "Startup Team", description: "Building as a co-founding core team" },
];

export function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("founder");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation checks
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!role) {
      setError("Please select your role.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
      });

      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected registration error occurred. Please try again.");
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

      {/* Registration Card */}
      <div className="w-full max-w-lg bg-[#121214] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white font-poppins mb-1">
            Create Your Igniter Account
          </h1>
          <p className="text-xs text-[#A1A1AA]">
            Join the multi-agent ecosystem for startup innovation
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5 font-poppins">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Jai Surya"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl pl-10 pr-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00] transition-colors font-poppins"
              />
            </div>
          </div>

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

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5 font-poppins">
              Your Primary Role
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    role === r.id
                      ? "bg-[#FF6B00]/15 border-[#FF6B00] text-white font-semibold shadow-sm"
                      : "bg-[#18181B] border-white/10 text-[#A1A1AA] hover:border-white/20"
                  }`}
                >
                  <div className="font-poppins text-xs font-medium text-white mb-0.5">
                    {r.label}
                  </div>
                  <div className="text-[10px] text-[#71717A] line-clamp-1">
                    {r.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5 font-poppins">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 bg-[#18181B] border border-white/10 rounded-xl pl-10 pr-4 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#FF6B00] transition-colors font-poppins"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-[#A1A1AA] mb-1.5 font-poppins">
              Confirm Password
            </label>
            <div className="relative">
              <ShieldCheck className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isSubmitting ? "Creating Account..." : "Create Account"}
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-white/10 text-xs text-[#A1A1AA]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#FF6B00] font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return <RegisterForm />;
}
