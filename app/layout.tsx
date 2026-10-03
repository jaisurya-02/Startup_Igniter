import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/lib/auth/auth-context";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Startup Igniter — The Venture Operating System",
  description:
    "Transform an idea into a structured venture through validation, intelligence, planning and execution.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-[#F4F4F5] font-poppins selection:bg-[#FF6B00]/30 selection:text-[#FF6B00]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
