"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  ShieldCheck,
  UploadCloud,
  BarChart3,
  CheckCircle,
  Cpu,
  LogOut,
  ChevronDown,
} from "lucide-react";

export const AppHeader: React.FC = () => {
  const pathname = usePathname();

  // Determine current active section for highlight
  const isSubmit = pathname?.startsWith("/institution");
  const isAdminOverview = pathname === "/admin/overview";
  const isBenchmark = pathname === "/admin/benchmark";
  const isVerifier = pathname?.startsWith("/verify");
  const isAdmin = Boolean(isAdminOverview || isBenchmark);
  const currentRole = isAdmin
    ? { name: "AICTE Central Admin", detail: "National Regulatory Directorate" }
    : isVerifier
      ? { name: "External Verifier", detail: "Read-only verification portal" }
      : { name: "Apex Institute of Tech", detail: "Institution ID · SYN-MH-0001" };

  const navItems = [
    { href: "/institution/submit", label: "Institution", icon: UploadCloud, active: isSubmit, tone: "text-sky-300" },
    { href: "/admin/overview", label: "Compliance", icon: BarChart3, active: isAdminOverview, tone: "text-emerald-300" },
    { href: "/admin/benchmark", label: "Benchmarks", icon: Cpu, active: isBenchmark, tone: "text-violet-300" },
    { href: "/verify/chk_demo8723", label: "Verification", icon: CheckCircle, active: isVerifier, tone: "text-teal-300" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-violet-300/10 bg-[#10051D]/90 text-white shadow-[0_12px_36px_-22px_rgba(168,85,247,0.55)] backdrop-blur-2xl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-8">
        <div className="flex min-h-[68px] items-center justify-between gap-4">
          {/* Brand & System Title */}
          <div className="flex items-center space-x-3">
            <Link href="/" aria-label="AICTE RegTech home" className="group flex min-w-0 items-center gap-3">
              <div className="rounded-xl border border-white/20 bg-gradient-to-br from-fuchsia-400 via-violet-600 to-indigo-700 p-2.5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_0_22px_-6px_rgba(192,132,252,0.8)] transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_0_28px_-4px_rgba(192,132,252,0.95)]">
                <ShieldCheck aria-hidden="true" className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate text-[15px] font-bold tracking-[-0.02em] text-white">
                    AICTE REGTECH
                  </span>
                  <span className="hidden rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-violet-200 sm:inline-flex">
                    v2026.1
                  </span>
                </div>
                <p className="hidden text-[11px] leading-4 text-violet-200/60 sm:block">
                  APAAR ID Academic Governance Platform
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">
            {navItems.map(({ href, label, icon: Icon, active, tone }) => (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-[12px] font-medium transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                  active
                    ? "bg-gradient-to-r from-violet-500/30 to-fuchsia-500/20 text-white shadow-[inset_0_0_0_1px_rgba(216,180,254,0.42),inset_0_1px_0_rgba(255,255,255,0.15),0_0_24px_-12px_rgba(192,132,252,0.9)]"
                    : "text-violet-100/70 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <Icon aria-hidden="true" className={`h-4 w-4 ${active ? "text-fuchsia-200" : tone}`} />
                {label}
              </Link>
            ))}
          </nav>

          {/* Persona / Switcher */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2.5 border-l border-white/10 pl-3 sm:flex xl:pl-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-300/20 to-fuchsia-400/10 text-violet-100 ring-1 ring-inset ring-white/15">
                {isAdmin ? <ShieldCheck aria-hidden="true" className="h-4 w-4" /> : isVerifier ? <CheckCircle aria-hidden="true" className="h-4 w-4" /> : <Building2 aria-hidden="true" className="h-4 w-4" />}
              </div>
              <div className="max-w-[170px] text-left">
                <div className="truncate text-[11px] font-semibold leading-4 text-white">
                  {currentRole.name}
                </div>
                <div className="truncate text-[10px] leading-4 text-violet-100/55">
                  {currentRole.detail}
                </div>
              </div>
            </div>

            <Link
              href="/login"
              aria-label="Switch role"
              title="Switch role"
              className="group inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-3 text-[11px] font-semibold text-violet-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_5px_20px_-12px_rgba(192,132,252,0.8)] transition duration-150 hover:-translate-y-px hover:border-violet-300/50 hover:bg-violet-400/15 hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_24px_-8px_rgba(192,132,252,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#10051D]"
            >
              <LogOut aria-hidden="true" className="h-3.5 w-3.5 text-violet-200/60 transition-colors group-hover:text-fuchsia-200" />
              <span className="hidden sm:inline">Switch role</span>
              <ChevronDown aria-hidden="true" className="hidden h-3 w-3 text-violet-200/50 sm:block" />
            </Link>
          </div>
        </div>
        <nav aria-label="Primary navigation" className="-mx-4 flex gap-1 overflow-x-auto border-t border-white/[0.08] px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:hidden">
          {navItems.map(({ href, label, icon: Icon, active }) => (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[11px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ${
                active ? "bg-gradient-to-r from-violet-500/30 to-fuchsia-500/20 text-white shadow-[inset_0_0_0_1px_rgba(216,180,254,0.35)]" : "text-violet-100/70 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              <Icon aria-hidden="true" className={`h-3.5 w-3.5 ${active ? "text-fuchsia-200" : "text-violet-200/50"}`} />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
